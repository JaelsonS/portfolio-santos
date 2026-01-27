// Form handler focado em UX: valida rápido no cliente e evita chamadas desnecessárias ao backend.

class FormHandler {
    constructor() {
        this.forms = new Map();
        this.apiBase = this.getApiBase();
        this.init();
    }
    
    init() {
        console.log('📝 Inicializando gerenciador de formulários...');

        // Centralizo configs aqui para manter consistência entre formulários.
        this.setupContactForm();
        this.setupNewsletterForm();

        // Validação em tempo real reduz retrabalho do utilizador.
        this.setupRealTimeValidation();
        
        console.log('✅ Gerenciador de formulários pronto!');
    }

    getApiBase() {
        // Uso data-api-base para trocar o backend sem mexer no JS.
        const dataBase = document.body ? document.body.dataset.apiBase : '';
        if (dataBase) return dataBase;

        // Se estiver local, aponto para localhost para facilitar testes.
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocal) return 'http://localhost:3001';

        return window.location.origin;
    }
    
    // Contact é o formulário principal; fica aqui para facilitar manutenção.
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        this.forms.set('contact', {
            element: contactForm,
            fields: ['name', 'email', 'subject', 'message'],
            required: ['name', 'email', 'message'],
            config: {
                successMessage: 'Mensagem enviada com sucesso!',
                errorMessage: 'Erro ao enviar mensagem.',
                sendingMessage: 'Enviando...'
            }
        });
        
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e, 'contact'));
        this.setupFieldEvents(contactForm);
    }
    
    // Newsletter está preparada para o futuro, mas não bloqueia o bundle atual.
    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (!newsletterForm) return;
        
        this.forms.set('newsletter', {
            element: newsletterForm,
            fields: ['newsletter-email'],
            required: ['newsletter-email'],
            config: {
                successMessage: 'Inscrito com sucesso!',
                errorMessage: 'Erro na inscrição.',
                sendingMessage: 'Processando...'
            }
        });
        
        newsletterForm.addEventListener('submit', (e) => this.handleSubmit(e, 'newsletter'));
    }
    
    // Eventos simples para feedback imediato sem libs externas.
    setupFieldEvents(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.clearFieldError(input);

                if (input.type === 'email' && input.value) {
                    this.validateEmailField(input);
                }
            });

            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');

                if (input.value.trim() && input.hasAttribute('required')) {
                    this.validateField(input);
                }
            });
        });
    }

    // Escuto o documento para manter validação consistente mesmo em inputs futuros.
    setupRealTimeValidation() {
        document.addEventListener('input', (e) => {
            if (e.target.type === 'email' && e.target.value) {
                this.validateEmailField(e.target);
            }
        });
    }

    // Submissão: valida primeiro, depois chama API para poupar requests no backend.
    async handleSubmit(event, formName) {
        event.preventDefault();
        
        const formConfig = this.forms.get(formName);
        if (!formConfig) return;
        
        const form = formConfig.element;
        this.setFormStatus(form, '', null);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        if (!this.validateForm(form, formConfig)) {
            this.showFormError(form, 'Por favor, corrija os erros acima.');
            return;
        }

        this.showLoadingState(submitBtn, formConfig.config.sendingMessage);
        
        try {
            const formData = this.getFormData(form, formConfig.fields);

            await this.submitContactForm(formData);
            
            this.showSuccessState(submitBtn, formConfig.config.successMessage);
            this.resetForm(form);
            this.setFormStatus(form, formConfig.config.successMessage, 'success');
            
            this.showSuccessNotification(formConfig.config.successMessage);

            setTimeout(() => {
                this.resetButtonState(submitBtn, originalContent);
            }, 5000);
            
        } catch (error) {
            const errorMessage = error?.message || formConfig.config.errorMessage;
            console.error('Erro no envio:', error);
            this.showErrorState(submitBtn, errorMessage);
            this.setFormStatus(form, errorMessage, 'error');

            setTimeout(() => {
                this.resetButtonState(submitBtn, originalContent);
            }, 3000);
        }
    }

    // Validação enxuta para evitar regex pesada e manter performance no mobile.
    validateForm(form, config) {
        let isValid = true;
        
        config.required.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });

        const emailField = form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            if (!this.validateEmailField(emailField)) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Validação por campo para mensagens claras sem recarregar a página.
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }

        if (isValid && value) {
            switch (field.type) {
                case 'email':
                    if (!this.isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Por favor, insira um email válido';
                    }
                    break;
                    
                case 'tel':
                    if (!this.isValidPhone(value)) {
                        isValid = false;
                        errorMessage = 'Por favor, insira um telefone válido';
                    }
                    break;
                    
                case 'url':
                    if (!this.isValidUrl(value)) {
                        isValid = false;
                        errorMessage = 'Por favor, insira uma URL válida';
                    }
                    break;
            }
            
            if (field.tagName === 'TEXTAREA' && value.length < 10) {
                isValid = false;
                errorMessage = 'A mensagem deve ter pelo menos 10 caracteres';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.showFieldSuccess(field);
        }
        
        return isValid;
    }
    
    // Email em tempo real evita frustração no submit.
    validateEmailField(field) {
        const value = field.value.trim();
        const isValid = this.isValidEmail(value);
        
        if (value && !isValid) {
            this.showFieldError(field, 'Por favor, insira um email válido');
            return false;
        }
        
        if (isValid) {
            this.showFieldSuccess(field);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Regex simples para não bloquear formatos internacionais.
    isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }

    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    // Feedback direto no campo evita o utilizador procurar o erro.
    showFieldError(field, message) {
        this.clearFieldStatus(field);
        
        field.classList.add('is-invalid');
        field.parentElement.classList.add('has-error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block mt-1';
        errorDiv.textContent = message;
        
        field.parentElement.appendChild(errorDiv);
        
        if (!this.firstErrorField) {
            this.firstErrorField = field;
            setTimeout(() => {
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                field.focus();
            }, 100);
        }
    }
    
    // Marca sucesso para reforçar confiança sem popups.
    showFieldSuccess(field) {
        this.clearFieldStatus(field);
        field.classList.add('is-valid');
    }
    
    // Limpeza para não acumular classes e manter CSS previsível.
    clearFieldStatus(field) {
        field.classList.remove('is-invalid', 'is-valid');
        field.parentElement.classList.remove('has-error', 'has-success');
        
        const feedbacks = field.parentElement.querySelectorAll('.invalid-feedback, .valid-feedback');
        feedbacks.forEach(feedback => feedback.remove());
    }
    
    clearFieldError(field) {
        this.firstErrorField = null;
        this.clearFieldStatus(field);
    }
    
    // Status no topo do formulário é mais legível em mobile.
    showFormError(form, message) {
        this.setFormStatus(form, message, 'error');
    }

    setFormStatus(form, message, type) {
        const statusEl = form.querySelector('.form-status');
        if (!statusEl) return;

        statusEl.textContent = message;
        statusEl.classList.remove('is-success', 'is-error', 'is-visible');

        if (message) {
            statusEl.classList.add('is-visible');
            if (type === 'success') statusEl.classList.add('is-success');
            if (type === 'error') statusEl.classList.add('is-error');
        }
    }
    
    // Botão em loading evita double click e reduz chamadas duplicadas.
    showLoadingState(button, message) {
        button.disabled = true;
        button.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${message}`;
        button.classList.remove('btn-primary', 'btn-success', 'btn-danger');
        button.classList.add('btn-warning');
    }
    
    showSuccessState(button, message) {
        button.innerHTML = `<i class="fas fa-check me-2"></i>${message}`;
        button.classList.remove('btn-warning', 'btn-primary', 'btn-danger');
        button.classList.add('btn-success');
    }
    
    showErrorState(button, message) {
        button.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
        button.classList.remove('btn-warning', 'btn-primary', 'btn-success');
        button.classList.add('btn-danger');
        button.disabled = false;
    }
    
    resetButtonState(button, originalContent) {
        button.innerHTML = originalContent;
        button.classList.remove('btn-warning', 'btn-success', 'btn-danger');
        button.classList.add('btn-primary');
        button.disabled = false;
    }
    
    // Normalizo os campos aqui para manter o payload consistente.
    getFormData(form, fields) {
        const data = {};
        
        fields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                data[fieldName] = field.value.trim();
            }
        });
        
        return data;
    }
    
    async submitContactForm(formData) {
        const payload = {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Contato do Portfolio',
            message: formData.message
        };

        const response = await fetch(`${this.apiBase}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || data.success === false) {
            const details = data?.errors?.map((error) => error.message).join(' ');
            throw new Error(details || data.message || 'Erro ao enviar mensagem.');
        }

        return data;
    }
    
    resetForm(form) {
        form.reset();
        
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => this.clearFieldStatus(field));
    }
    
    // Notificação leve (sem lib) para manter bundle pequeno.
    showSuccessNotification(message) {
        const existingNotification = document.querySelector('.success-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        if (!document.querySelector('#notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Inicializa após o DOM para garantir que os elementos existam.
document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new FormHandler();

    window.formHandler = formHandler;
});

// Estilos injetados aqui evitam depender do Bootstrap para estados do input.
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .is-invalid {
            border-color: #dc3545 !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") !important;
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
        
        .is-valid {
            border-color: #28a745 !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e") !important;
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
        
        .has-error .form-label {
            color: #dc3545 !important;
        }
        
        .invalid-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #dc3545;
        }
        
        .valid-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #28a745;
        }
        
        .form-floating.focused .form-label {
            transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
            color: #1a237e;
        }
        
        .form-error {
            animation: shake 0.5s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});