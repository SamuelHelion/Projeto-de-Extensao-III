// src/pages/dashboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/dashboard.css';

function Dashboard() {
  const [busca, setBusca] = useState('');
  const navigate = useNavigate(); 

  const denunciasMock = [
  { id: 'EP30426', titulo: 'Iluminação pública', data: '19/04/26', descricao: 'Três postes sem luz na Praça da Matriz gerando insegurança.', likes: 52, icon: '💡' },
  { id: 'EP30226', titulo: 'Buraco na rua', data: '15/04/26', descricao: 'Buraco na rua 12 dificultando a passagem de veículos.', likes: 41, icon: '🛣️' },
  { id: 'EP30826', titulo: 'Lixo acumulado', data: '12/04/26', descricao: 'Acúmulo de lixo causando mau cheiro e alagamentos na via.', likes: 31, icon: '🚯' },
  { id: 'EP30626', titulo: 'Problema de trânsito', data: '16/04/26', descricao: 'Árvore de grande porte atrapalhando o fluxo na via pública.', likes: 25, icon: '🚦' },
  { id: 'EP30726', titulo: 'Transporte Público', data: '14/04/26', descricao: 'Sinalização do ponto de ônibus apagada e em estado precário.', likes: 19, icon: '🚌' },
  { id: 'EP30526', titulo: 'Segurança', data: '18/04/26', descricao: 'Ausência de ronda policial e falta de patrulhamento na área.', likes: 12, icon: '🚓' },
];

  const denunciasFiltradas = denunciasMock
    .filter(d =>
      d.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      d.id.toLowerCase().includes(busca.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes);

  // Função de navegação com Log para teste
  const abrirDetalhes = (id) => {
    console.log("Tentando abrir denúncia:", id); // Verifique isso no console do navegador (F12)
    navigate(`/acompanhar/${id.toUpperCase()}`);
  };

  return (
    <div className="dashboard-container">
      <div className="consulta-wrapper">
        <h2>Acompanhar Solicitação</h2>
        <p>Digite o número do protocolo para consultar o andamento da sua solicitação</p>
        
        <div className="search-box-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔎</span>
            <input
              type="text"
              placeholder="Ex: EP30226"
              className="search-input-new"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && busca && abrirDetalhes(busca)}
            />
          </div>
          <button 
            className="btn-buscar-azul" 
            onClick={() => busca && abrirDetalhes(busca)}
          >
            Buscar
          </button>
        </div>
      </div>

      <h2 className="timeline-header">Timeline de Denúncias</h2>

      <div className="complaints-grid">
        {denunciasFiltradas.slice(0, 6).map((item) => (
          <div 
            key={item.id} 
            className="complaint-card" 
            onClick={() => abrirDetalhes(item.id)}
            style={{ cursor: 'pointer' }} 
          >
            <div className="card-top">
              <span className="card-id">{item.id}</span>
              <span className="card-date">{item.data}</span>
            </div>

            <div className="card-content">
              <h3 className="card-title">
                <span className="card-icon">{item.icon}</span>
                {item.titulo}
              </h3>
              <p className="card-description">{item.descricao}</p>
            </div>

            <div className="card-footer">
              <button className="like-button" onClick={(e) => e.stopPropagation()}>
                {item.likes} 👍
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {denunciasFiltradas.length === 0 && (
        <p style={{marginTop: '20px', color: '#666'}}>Nenhuma denúncia encontrada para "{busca}"</p>
      )}
    </div>
  );
}

export default Dashboard;