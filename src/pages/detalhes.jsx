// src/pages/detalhes.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/detalhes.css';
import '../styles/dashboard.css';
import { usePost } from '../context/PostContext';

function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, likePost, post, loading, error } = usePost();

  useEffect(() => {
    getPostById(id);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  if (loading) return <div className="dashboard-container" style={{ textAlign: 'center' }}><p>Carregando detalhes...</p></div>;
  if (error) return <div className="dashboard-container" style={{ textAlign: 'center' }}><p>{error}</p></div>;
  if (!post) return <div className="dashboard-container" style={{ textAlign: 'center' }}><p>Denúncia não encontrada</p></div>;

  return (
    <div className="dashboard-container">
      <div className="detalhe-card-container">
        <div className="detalhe-header">
          <div></div>
          <button className="btn-voltar" onClick={() => navigate(-1)}>Voltar</button>
        </div>

        <div className="detalhe-content">
          <h1>{post.title}</h1>

          <div className="detalhe-info-grid">
            <div className="info-item">
              <strong>📍 Localização:</strong>
              <p>{post.address}</p>
            </div>
            <div className="info-item">
              <strong>📅 Data de Abertura:</strong>
              <p>{formatDate(post.createdAt)}</p>
            </div>
          </div>

          <div className="info-item">
            <strong>📝 Descrição Completa:</strong>
            <p className="descricao-texto">{post.description}</p>
          </div>

          <div className="foto-do-problema-wrapper">
            <h2>Foto do Problema</h2>
            <div className="foto-grid">
              <div className="foto-placeholder">
                <img
                  src={`data:${post.mimeType};base64,${post.imageBase64}`}
                  alt="Preview"
                />
              </div>
            </div>
          </div>

          <div className="detalhe-footer">
            <div className="likes-badge">👍 {post.likes} Curtidas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;