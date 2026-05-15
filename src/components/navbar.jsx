// src/components/navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Fecha o menu ao trocar de rota
  useEffect(() => {
    setMenuAberto(false);
  }, [location]);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickFora(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-logo">Projeto de Extensão III 📖</div>

      {/* Botão hambúrguer — visível só no mobile via CSS */}
      <button
        className={`navbar-hamburger ${menuAberto ? 'open' : ''}`}
        onClick={() => setMenuAberto(!menuAberto)}
        aria-label="Abrir menu"
        aria-expanded={menuAberto}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* Links de navegação */}
      <div className={`navbar-links ${menuAberto ? 'open' : ''}`}>
        <Link to="/inicio" className="nav-link">Início</Link>
        <Link to="/denunciar" className="nav-link">Denuncie</Link>
        <Link to="/acompanhar" className="nav-link">Acompanhe</Link>
        <Link
          to="/"
          className="nav-link-sair"
          onClick={() => localStorage.removeItem('token')}
        >
          Logout ➡️
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
