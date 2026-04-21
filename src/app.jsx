// src/app.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './pages/login';
import Inicio from './pages/index';
import Formulario from './pages/form';
import Dashboard from './pages/dashboard';
import Detalhes from './pages/detalhes'; // Import da nova página de detalhes

function App() {
  const location = useLocation();

  return (
    <>
      {/* Só exibe o Navbar se o caminho NÃO for a raiz "/" (Login) */}
      {location.pathname !== '/' && <Navbar />}
      
      <div style={{ padding: location.pathname === '/' ? '0' : '20px' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/denunciar" element={<Formulario />} />
          <Route path="/acompanhar" element={<Dashboard />} />
          {/* Nova rota dinâmica para ver os detalhes de uma denúncia específica */}
          <Route path="/acompanhar/:id" element={<Detalhes />} />
        </Routes>
      </div>
    </>
  );
}

export default App;