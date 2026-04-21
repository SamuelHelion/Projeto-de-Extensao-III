// src/pages/detalhes.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/detalhes.css';
import '../styles/dashboard.css'; // Reaproveitamos o estilo da busca

function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');

  // Nosso "Banco de Dados" (Deve ser igual ao do Dashboard para encontrar o ID)
  // Adicionei descrições mais longas para simular o card maior
  const denunciasMock = [
  { id: 'EP30426', titulo: 'Iluminação pública', data: '19/04/26', local: 'Praça da Matriz, 45 - Bairro Centro', descricao: 'Três postes sem luz na Praça da Matriz gerando insegurança.', likes: 52 },
  { id: 'EP30226', titulo: 'Buraco na rua', data: '15/04/26', local: 'Rua das Flores, 120 - Bairro Jardim', descricao: 'Buraco na rua 12 dificultando a passagem de veículos.', likes: 41 },
  { id: 'EP30826', titulo: 'Lixo acumulado', data: '12/04/26', local: 'Rua do Porto, 89 - Bairro Industrial', descricao: 'Acúmulo de lixo causando mau cheiro e alagamentos na via.', likes: 31 },
  { id: 'EP30626', titulo: 'Problema de trânsito', data: '16/04/26', local: 'Av. Principal, 500 - Bairro Alvorada', descricao: 'Árvore de grande porte atrapalhando o fluxo na via pública.', likes: 25 },
  { id: 'EP30726', titulo: 'Transporte Público', data: '14/04/26', local: 'Rua Lateral, 12 - Bairro Santo Antônio', descricao: 'Sinalização do ponto de ônibus apagada e em estado precário.', likes: 19 },
  { id: 'EP30526', titulo: 'Segurança', data: '18/04/26', local: 'Av. Brasil, 1020 - Bairro Novo', descricao: 'Ausência de ronda policial e falta de patrulhamento na área.', likes: 12 },
];

  // Busca a denúncia específica pelo ID da URL
  const denuncia = denunciasMock.find(d => d.id === id);

  if (!denuncia) return <div className="dashboard-container"><h1>Denúncia não encontrada</h1></div>;

  return (
    <div className="dashboard-container">
      {/* Barra de Pesquisa (Mantida) */}
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
            />
          </div>
          <button className="btn-buscar-azul" onClick={() => navigate(`/acompanhar/${busca.toUpperCase()}`)}>
            Buscar
          </button>
        </div>
      </div>

      {/* NOVO SUPER CARD (Topo Azul e Foto do Problema) */}
      <div className="detalhe-card-container">
        {/* TOPO AZUL (Conforme orientação) */}
        <div className="detalhe-header">
          <span className="detalhe-id">{denuncia.id}</span>
          <button className="btn-voltar" onClick={() => navigate('/acompanhar')}>Voltar</button>
        </div>
        
        <div className="detalhe-content">
          <h1>{denuncia.titulo}</h1>
          
          <div className="detalhe-info-grid">
            <div className="info-item">
              <strong>📍 Localização:</strong>
              <p>{denuncia.local}</p>
            </div>
            <div className="info-item">
              <strong>📅 Data de Abertura:</strong>
              <p>{denuncia.data}</p>
            </div>
          </div>

          <div className="info-item">
            <strong>📝 Descrição Completa:</strong>
            <p className="descricao-texto">{denuncia.descricao}</p>
          </div>

          {/* NOVO CAMPO: FOTO DO PROBLEMA */}
          <div className="foto-do-problema-wrapper">
            <h2>Foto do Problema</h2>
            <div className="foto-grid">
              <div className="foto-placeholder">
                <p>Nenhuma foto anexada</p>
              </div>
            </div>
          </div>

          {/* RODAPÉ SEM CAMPO DE STATUS (Retirado) */}
          <div className="detalhe-footer">
            <div className="likes-badge">👍 {denuncia.likes} Curtidas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;