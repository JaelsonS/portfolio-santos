document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('form-contato');
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const listaMenu = document.querySelector('.lista-menu');
    const linksMenu = document.querySelectorAll('.lista-menu a');

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        
        alert(`Obrigado, ${nome}! Sua mensagem foi recebida.\nEm breve entraremos em contacto.`);
        
        console.log('Formulário enviado:', { nome, email, mensagem });
        
        formulario.reset();
    });

    menuHamburguer.addEventListener('click', function() {
        const estaAtivo = listaMenu.classList.toggle('ativo');
        menuHamburguer.setAttribute('aria-expanded', estaAtivo);
        
        menuHamburguer.classList.toggle('ativo');
    });

    linksMenu.forEach(link => {
        link.addEventListener('click', function() {
            listaMenu.classList.remove('ativo');
            menuHamburguer.setAttribute('aria-expanded', 'false');
            menuHamburguer.classList.remove('ativo');
        });
    });

    document.addEventListener('click', function(e) {
        if (!menuHamburguer.contains(e.target) && !listaMenu.contains(e.target)) {
            listaMenu.classList.remove('ativo');
            menuHamburguer.setAttribute('aria-expanded', 'false');
            menuHamburguer.classList.remove('ativo');
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            listaMenu.classList.remove('ativo');
            menuHamburguer.setAttribute('aria-expanded', 'false');
            menuHamburguer.classList.remove('ativo');
        }
    });

    const botoesAcao = document.querySelectorAll('.botao-acao, .botao-secundario, .lista-menu a');
    
    botoesAcao.forEach(botao => {
        botao.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const idAlvo = this.getAttribute('href');
                const elementoAlvo = document.querySelector(idAlvo);
                
                if (elementoAlvo) {
                    window.scrollTo({
                        top: elementoAlvo.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    window.addEventListener('scroll', function() {
        const cabecalho = document.querySelector('.cabecalho');
        
        if (window.scrollY > 100) {
            cabecalho.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            cabecalho.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});