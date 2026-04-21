// src/components/navbar.jsx
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Importando o CSS

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Projeto de Extensão III📖</div>
      <div className="navbar-links">
        <Link to="/inicio" className="nav-link"> Início</Link>
        <Link to="/denunciar" className="nav-link"> Denuncie</Link>
        <Link to="/acompanhar" className="nav-link"> Acompanhe</Link>
        <Link to="/" className="nav-link-sair">Logout➡️</Link>
      </div>
    </nav>
  );
}

export default Navbar;