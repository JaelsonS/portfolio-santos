// =============================================
// FORM HANDLER - GERENCIAMENTO DE FORMULÁRIOS
// =============================================

class FormHandler {
    constructor() {
        this.forms = new Map();
        this.init();
    }
    
    init() {
        console.log('📝 Inicializando gerenciador de formulários...');
        
        // Configura todos os formulários da página
        this.setupContactForm();
        this.setupNewsletterForm();
        
        // Configura validações em tempo real
        this.setupRealTimeValidation();
        
        console.log('✅ Gerenciador de formulários pronto!');
    }
    
    // Configura formulário de contato
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
        
        // Event listeners
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e, 'contact'));
        this.setupFieldEvents(contactForm);
    }
    
    // Configura formulário de newsletter (exemplo futuro)
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
    
    // Configura eventos para campos
    setupFieldEvents(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Limpa erro ao digitar
            input.addEventListener('input', () => {
                this.clearFieldError(input);
                
                // Validação em tempo real para email
                if (input.type === 'email' && input.value) {
                    this.validateEmailField(input);
                }
            });
            
            // Foco no campo
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            // Perde foco
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                
                // Valida campo ao sair
                if (input.value.trim() && input.hasAttribute('required')) {
                    this.validateField(input);
                }
            });
        });
    }
    
    // Validação em tempo real
    setupRealTimeValidation() {
        // Validação de email em tempo real
        document.addEventListener('input', (e) => {
            if (e.target.type === 'email' && e.target.value) {
                this.validateEmailField(e.target);
            }
        });
    }
    
    // Manipula submit do formulário
    async handleSubmit(event, formName) {
        event.preventDefault();
        
        const formConfig = this.forms.get(formName);
        if (!formConfig) return;
        
        const form = formConfig.element;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Valida formulário
        if (!this.validateForm(form, formConfig)) {
            this.showFormError(form, 'Por favor, corrija os erros acima.');
            return;
        }
        
        // Mostra estado de carregamento
        this.showLoadingState(submitBtn, formConfig.config.sendingMessage);
        
        try {
            // Prepara dados
            const formData = this.getFormData(form, formConfig.fields);
            
            // Simula envio (substituir por API real)
            await this.simulateSubmission(formData);
            
            // Sucesso
            this.showSuccessState(submitBtn, formConfig.config.successMessage);
            this.resetForm(form);
            
            // Feedback adicional
            this.showSuccessNotification(formConfig.config.successMessage);
            
            // Retorna ao normal após 5 segundos
            setTimeout(() => {
                this.resetButtonState(submitBtn, originalContent);
            }, 5000);
            
        } catch (error) {
            console.error('Erro no envio:', error);
            this.showErrorState(submitBtn, formConfig.config.errorMessage);
            
            // Retorna ao normal após 3 segundos
            setTimeout(() => {
                this.resetButtonState(submitBtn, originalContent);
            }, 3000);
        }
    }
    
    // Valida formulário completo
    validateForm(form, config) {
        let isValid = true;
        
        // Valida campos obrigatórios
        config.required.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Valida campos específicos
        const emailField = form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            if (!this.validateEmailField(emailField)) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Valida campo individual
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Verifica se é obrigatório
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }
        
        // Validações específicas por tipo
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
            
            // Validações para textarea
            if (field.tagName === 'TEXTAREA' && value.length < 10) {
                isValid = false;
                errorMessage = 'A mensagem deve ter pelo menos 10 caracteres';
            }
        }
        
        // Mostra ou esconde erro
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.showFieldSuccess(field);
        }
        
        return isValid;
    }
    
    // Valida campo de email
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
    
    // Verifica se email é válido
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Verifica se telefone é válido (simplificado)
    isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }
    
    // Verifica se URL é válida
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    // Mostra erro no campo
    showFieldError(field, message) {
        this.clearFieldStatus(field);
        
        field.classList.add('is-invalid');
        field.parentElement.classList.add('has-error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block mt-1';
        errorDiv.textContent = message;
        
        field.parentElement.appendChild(errorDiv);
        
        // Scroll para o primeiro erro
        if (!this.firstErrorField) {
            this.firstErrorField = field;
            setTimeout(() => {
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                field.focus();
            }, 100);
        }
    }
    
    // Mostra sucesso no campo
    showFieldSuccess(field) {
        this.clearFieldStatus(field);
        field.classList.add('is-valid');
    }
    
    // Limpa status do campo
    clearFieldStatus(field) {
        field.classList.remove('is-invalid', 'is-valid');
        field.parentElement.classList.remove('has-error', 'has-success');
        
        // Remove mensagens de feedback
        const feedbacks = field.parentElement.querySelectorAll('.invalid-feedback, .valid-feedback');
        feedbacks.forEach(feedback => feedback.remove());
    }
    
    // Limpa erro específico
    clearFieldError(field) {
        this.firstErrorField = null;
        this.clearFieldStatus(field);
    }
    
    // Mostra erro no formulário
    showFormError(form, message) {
        // Remove erros anteriores
        const existingError = form.querySelector('.form-error');
        if (existingError) existingError.remove();
        
        // Cria elemento de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error alert alert-danger mt-3';
        errorDiv.textContent = message;
        
        // Insere antes do botão de submit
        const submitBtn = form.querySelector('button[type="submit"]');
        form.insertBefore(errorDiv, submitBtn.parentElement);
        
        // Remove após 5 segundos
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Mostra estado de carregamento
    showLoadingState(button, message) {
        button.disabled = true;
        button.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${message}`;
        button.classList.remove('btn-primary', 'btn-success', 'btn-danger');
        button.classList.add('btn-warning');
    }
    
    // Mostra estado de sucesso
    showSuccessState(button, message) {
        button.innerHTML = `<i class="fas fa-check me-2"></i>${message}`;
        button.classList.remove('btn-warning', 'btn-primary', 'btn-danger');
        button.classList.add('btn-success');
    }
    
    // Mostra estado de erro
    showErrorState(button, message) {
        button.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
        button.classList.remove('btn-warning', 'btn-primary', 'btn-success');
        button.classList.add('btn-danger');
        button.disabled = false;
    }
    
    // Reseta estado do botão
    resetButtonState(button, originalContent) {
        button.innerHTML = originalContent;
        button.classList.remove('btn-warning', 'btn-success', 'btn-danger');
        button.classList.add('btn-primary');
        button.disabled = false;
    }
    
    // Obtém dados do formulário
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
    
    // Simula envio (substituir por API real)
    async simulateSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simula 90% de sucesso
                if (Math.random() > 0.1) {
                    console.log('📤 Dados enviados:', formData);
                    
                    // Se for formulário de contato, redireciona para email
                    if (formData.email && formData.message) {
                        this.redirectToMail(formData);
                    }
                    
                    resolve(formData);
                } else {
                    reject(new Error('Falha na conexão'));
                }
            }, 1500);
        });
    }
    
    // Redireciona para cliente de email
    redirectToMail(formData) {
        const subject = encodeURIComponent(formData.subject || 'Contato do Portfolio');
        const body = encodeURIComponent(
            `Nome: ${formData.name}\n` +
            `Email: ${formData.email}\n\n` +
            `Mensagem:\n${formData.message}\n\n` +
            `---\nEnviado do portfolio de Jaelson Santos`
        );
        
        setTimeout(() => {
            window.location.href = `mailto:jaelsondev345@gmail.com?subject=${subject}&body=${body}`;
        }, 800);
    }
    
    // Reseta formulário
    resetForm(form) {
        form.reset();
        
        // Limpa todos os status
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => this.clearFieldStatus(field));
    }
    
    // Mostra notificação de sucesso
    showSuccessNotification(message) {
        // Remove notificação anterior
        const existingNotification = document.querySelector('.success-notification');
        if (existingNotification) existingNotification.remove();
        
        // Cria notificação
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Estilos
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
        
        // Remove após 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        // Adiciona animação CSS se não existir
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

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new FormHandler();
    
    // Expõe para debug (opcional)
    window.formHandler = formHandler;
});

// Adiciona estilos para validação
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