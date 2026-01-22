'use client';

import { useState, FormEvent } from 'react';
import { 
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane,
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaLinkedin,
  FaCode, FaGlobe, FaRocket, FaBriefcase, FaCogs
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiBootstrap } from 'react-icons/si';
import axios from 'axios';

export default function PortfolioPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({type: null, message: ''});

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Mensagem enviada com sucesso!'
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao enviar. Tente novamente ou entre em contato diretamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const technologies = [
    { icon: <FaHtml5 />, name: 'HTML5', color: '#e34f26' },
    { icon: <FaCss3Alt />, name: 'CSS3', color: '#1572b6' },
    { icon: <FaJs />, name: 'JavaScript', color: '#f7df1e' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178c6' },
    { icon: <FaReact />, name: 'React', color: '#61dafb' },
    { icon: <SiNextdotjs />, name: 'Next.js', color: '#000000' },
    { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
    { icon: <SiBootstrap />, name: 'Bootstrap', color: '#7952b3' },
  ];

  const services = [
    { icon: <FaGlobe />, title: 'Sites Institucionais', description: 'Sites profissionais e responsivos' },
    { icon: <FaRocket />, title: 'Landing Pages', description: 'Páginas de alta conversão' },
    { icon: <FaBriefcase />, title: 'Portfólios', description: 'Sites para apresentar trabalhos' },
    { icon: <FaCogs />, title: 'Sistemas Web', description: 'Soluções personalizadas' },
  ];

  const projects = [
    { title: 'SAASude.com', description: 'Plataforma SaaS para clínicas', tech: ['Next.js', 'TypeScript', 'Node.js'] },
    { title: 'Portfólio Santos Tech', description: 'Este site com backend integrado', tech: ['Next.js', 'Bootstrap', 'Node.js'] },
    { title: 'Em Desenvolvimento', description: 'Novos projetos full stack', tech: ['React', 'Node.js', 'MongoDB'] },
  ];

  return (
    <>
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            <span className="text-warning">Santos</span> Tech
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#inicio">Início</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#sobre">Sobre</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#servicos">Serviços</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projetos">Projetos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contato">Contato</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-5 mt-5" style={{ background: 'linear-gradient(135deg, #1a237e, #3949ab)', color: 'white' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Desenvolvimento <span className="text-warning">Web Full Stack</span>
              </h1>
              <p className="lead mb-4">
                Crio soluções web modernas com Next.js, TypeScript, Node.js e React. 
                Sites, sistemas web e aplicações completas para seu negócio.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#contato" className="btn btn-warning btn-lg fw-bold">
                  <FaPaperPlane className="me-2" /> Entrar em Contato
                </a>
                <a href="#projetos" className="btn btn-outline-light btn-lg">
                  Ver Projetos
                </a>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="bg-white/10 p-4 rounded-3">
                <h4 className="mb-3">🛠 Stack Principal</h4>
                <div className="row g-3">
                  {technologies.slice(0, 6).map((tech, index) => (
                    <div key={index} className="col-4 col-md-3 col-lg-4">
                      <div className="text-center p-3 bg-white/5 rounded-3">
                        <div style={{ fontSize: '2rem', color: tech.color }}>
                          {tech.icon}
                        </div>
                        <small className="d-block mt-2">{tech.name}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-5 bg-light">
        <div className="container py-5">
          <h2 className="text-center mb-5 display-5 fw-bold" style={{ color: '#1a237e' }}>
            Sobre <span className="text-warning">Jaelson Santos</span>
          </h2>
          
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card border-0 shadow">
                <div className="card-body p-4">
                  <h3 className="card-title mb-3">Desenvolvedor Full Stack</h3>
                  <p className="card-text">
                    Sou Jaelson Santos, estudante de Full Stack na Master D Coimbra e fundador da Santos Tech. 
                    Apaixonado por tecnologia, estou focado em criar soluções web que realmente resolvem problemas.
                  </p>
                  <p className="card-text">
                    Atualmente trabalho no projeto <strong>SAASude.com</strong> - uma plataforma SaaS para clínicas, 
                    enquanto busco oportunidades como estagiário ou freelancer em Leiria e região.
                  </p>
                  <div className="mt-4">
                    <h5>Formação:</h5>
                    <ul className="list-unstyled">
                      <li>🎓 Full Stack Developer - Master D Coimbra</li>
                      <li>💼 Empreendedor - Santos Tech</li>
                      <li>📍 Baseado em Leiria, Portugal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <h4 className="mb-4">Tecnologias que Domino:</h4>
              <div className="row g-3">
                {technologies.map((tech, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-4">
                    <div className="d-flex align-items-center p-3 bg-white border rounded-3">
                      <div className="me-3" style={{ fontSize: '1.5rem', color: tech.color }}>
                        {tech.icon}
                      </div>
                      <div>
                        <strong>{tech.name}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-5">
        <div className="container py-5">
          <h2 className="text-center mb-5 display-5 fw-bold" style={{ color: '#1a237e' }}>
            Meus <span className="text-warning">Serviços</span>
          </h2>
          
          <div className="row g-4">
            {services.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{ fontSize: '2.5rem', color: '#1a237e' }}>
                      {service.icon}
                    </div>
                    <h5 className="card-title mb-3">{service.title}</h5>
                    <p className="card-text text-muted">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="py-5 bg-light">
        <div className="container py-5">
          <h2 className="text-center mb-5 display-5 fw-bold" style={{ color: '#1a237e' }}>
            Meus <span className="text-warning">Projetos</span>
          </h2>
          
          <div className="row g-4">
            {projects.map((project, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <FaCode className="me-2" style={{ color: '#1a237e' }} />
                      <h5 className="card-title mb-0">{project.title}</h5>
                    </div>
                    <p className="card-text mb-4">{project.description}</p>
                    <div className="mb-3">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="badge bg-secondary me-1 mb-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {index === 0 && (
                      <a 
                        href="https://saasude.com" 
                        target="_blank" 
                        className="btn btn-sm" 
                        style={{ backgroundColor: '#1a237e', color: 'white' }}
                      >
                        Ver Projeto Online
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-5">
        <div className="container py-5">
          <h2 className="text-center mb-5 display-5 fw-bold" style={{ color: '#1a237e' }}>
            Entre em <span className="text-warning">Contato</span>
          </h2>
          
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card border-0 shadow">
                <div className="card-body p-4">
                  <h4 className="mb-4">Envie sua mensagem</h4>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Mensagem</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    
                    {submitStatus.type && (
                      <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                        {submitStatus.message}
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      className="btn w-100" 
                      style={{ backgroundColor: '#1a237e', color: 'white' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card border-0 h-100 shadow" style={{ backgroundColor: '#1a237e', color: 'white' }}>
                <div className="card-body p-4">
                  <h4 className="mb-4">Informações de Contato</h4>
                  
                  <div className="mb-4">
                    <h5 className="mb-3">
                      <FaWhatsapp className="me-2 text-warning" />
                      WhatsApp / Telefone
                    </h5>
                    <a 
                      href="https://wa.me/351916447990" 
                      target="_blank"
                      className="text-white text-decoration-none"
                    >
                      +351 916 447 990
                    </a>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="mb-3">
                      <FaEnvelope className="me-2 text-warning" />
                      Email
                    </h5>
                    <a 
                      href="mailto:jaelsondev345@gmail.com"
                      className="text-white text-decoration-none"
                    >
                      jaelsondev345@gmail.com
                    </a>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="mb-3">
                      <FaMapMarkerAlt className="me-2 text-warning" />
                      Localização
                    </h5>
                    <p className="mb-1">Leiria, Portugal</p>
                    <small>Disponível para projetos na região e remotamente</small>
                  </div>
                  
                  <div className="mt-5">
                    <h5 className="mb-3">Redes Sociais</h5>
                    <div className="d-flex gap-3">
                      <a 
                        href="https://github.com/JaelsonS" 
                        target="_blank"
                        className="text-white fs-4"
                      >
                        <FaGithub />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/jaelson-santos-8628b52a4/" 
                        target="_blank"
                        className="text-white fs-4"
                      >
                        <FaLinkedin />
                      </a>
                      <a 
                        href="mailto:jaelsondev345@gmail.com"
                        className="text-white fs-4"
                      >
                        <FaEnvelope />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="fw-bold">
                <span className="text-warning">Santos</span> Tech
              </h5>
              <p className="mb-0">Desenvolvimento Web & Sistemas</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} Santos Tech. Todos os direitos reservados.
              </p>
              <small>Desenvolvido por Jaelson Santos</small>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão WhatsApp Flutuante */}
      <a 
        href="https://wa.me/351916447990" 
        target="_blank"
        className="position-fixed bottom-3 end-3 bg-success text-white rounded-circle p-3 shadow-lg"
        style={{ zIndex: 1000 }}
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Bootstrap JS */}
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
