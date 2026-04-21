// src/pages/login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Importando o CSS que criamos

function Login() {
  const [isCadastro, setIsCadastro] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação: Navega para a home do Projeto de Extensão III
    navigate('/inicio');
  };

  return (
    <div className="main-container">
      <div className="card-duplo">
        
        {/* Lado Esquerdo - Apresentação Projeto de Extensão III */}
        <div className="card-esquerdo">
          <h1 className="logo-pde3">Projeto de Extensão III📖</h1>
          <h2 className="titulo-esquerdo">Voz Local🗣️</h2>
          <p className="texto-esquerdo">
            Voz Local é o canal direto entre você e a melhoria da sua cidade.<br></br>
            Reporte problemas e acompanhe soluções.
          </p>
          <div className="ilustracao-simples">🗣️</div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="card-direito">
          <h2>{isCadastro ? 'Crie sua conta👋' : 'Bem-vindo👋'}</h2>
          <p className="subtitulo">Acesse o painel do Projeto de Extensão III</p>

          <form onSubmit={handleSubmit} className="login-form">
            {isCadastro && (
              <div className="input-group">
                <label className="input-label">👤Nome:</label>
                <input type="text" placeholder="Nome completo" className="login-input" required />
              </div>
            )}
            
            <div className="input-group">
              <label className="input-label">📩E-mail:</label>
              <input type="email" placeholder="seu@email.com" className="login-input" required />
            </div>

            <div className="input-group">
              <label className="input-label">🔑Senha:</label>
              <input type="password" placeholder="********" className="login-input" required />
            </div>

            <button type="submit" className="login-button">
              {isCadastro ? 'Finalizar Cadastro' : 'Entrar no Sistema'}
            </button>
          </form>

          <button onClick={() => setIsCadastro(!isCadastro)} className="toggle-btn">
            {isCadastro ? 'Já tenho conta' : 'Criar nova conta agora'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;