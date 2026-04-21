// src/pages/inicio.jsx
import { Link } from 'react-router-dom';
import '../styles/inicio.css';

function Inicio() {
  return (
    <div className="inicio-page">

      {/* Hero */}
      <section className="hero-section">
        <h1>Voz Local - Projeto de Extensão III📖</h1>
        <p>
          Bem-vindo ao <strong>Projeto de Extensão III</strong>👋. Nossa missão é
          conectar os cidadãos à gestão pública, permitindo que você reporte
          problemas reais da sua rua ou bairro e ajude a prefeitura a priorizar o que importa.
        </p>
      </section>

      {/* Título centralizado */}
      <h2 className="section-title">Como funciona o nosso Projeto de Extensão III?</h2>

      {/* 3 Cards lado a lado */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>Reporte</h3>
          <p>
            Encontrou um buraco ou lixo acumulado? <strong>Denuncie!</strong><br></br>
            É só preencher o formulário rápido com fotos e a localização do problema.
          </p>
          <Link to="/denunciar" className="feature-btn">Registrar Problema</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Pesquise</h3>
          <p>
            Explore o nosso painel para ver problemas já relatados por outros moradores. 
            Entenda o que está acontecendo na sua cidade e ajude a cobrar soluções.
          </p>
          <Link to="/acompanhar" className="feature-btn">Ver Denúncias</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👍</div>
          <h3>Engaje</h3>
          <p>
            Dê curtidas em denúncias importantes. Quanto mais votos uma denúncia recebe,
            maior o destaque dela no topo da nossa timeline para a prefeitura.
          </p>
          <Link to="/acompanhar" className="feature-btn">Apoiar a Comunidade</Link>
        </div>
      </div>
    </div>
  );
}

export default Inicio;