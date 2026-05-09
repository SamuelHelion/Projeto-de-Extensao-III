// src/pages/login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Importando o CSS que criamos
import { useAuth } from '../context/AuthContext';

function Login() {
  const [isCadastro, setIsCadastro] = useState(false);
  const navigate = useNavigate();
  const { login, createAccount } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCadastro) {
      await createUserAccount(e);
    } else {
      await userLogin(e);
    }
  };

  const userLogin = async (e) => {
    setLoading(true);
    setError('');

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      navigate('/inicio');
    } else {
      setError(result.message);
    }
  };

  const createUserAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await createAccount(name, email, password);

    setLoading(false);

    if (result.success) {
      setIsCadastro(false);
      await userLogin(e); // Tenta logar automaticamente após criar conta
    } else {
      setError(result.message);
    }
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
                <input type="text" placeholder="Nome completo" className="login-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}

            <div className="input-group">
              <label className="input-label">📩E-mail:</label>
              <input type="email" placeholder="seu@email.com" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label className="input-label">🔑Senha:</label>
              <input type="password" placeholder="********" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && <p style={{ color: 'red', fontSize: '14px', }}>{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? '⏳Carregando...' : (isCadastro ? 'Finalizar Cadastro' : 'Entrar no Sistema')}
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