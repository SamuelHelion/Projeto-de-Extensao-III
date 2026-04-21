// src/pages/form.jsx
import { useState } from 'react';
import '../styles/form.css';

function Form() {
  const [formData, setFormData] = useState({
    tipo: '',
    descricao: '',
    localizacao: '',
    email: '',
    telefone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Denúncia enviada com sucesso! (Simulação)');
    console.log('Dados enviados:', formData);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>⚠️ Registrar Problema</h1>
        <p>Preencha o formulário abaixo para reportar um problema na sua cidade. Quanto mais detalhes você fornecer, melhor!</p>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        
        {/* Tipo de Problema */}
        <div className="form-group">
          <label>📋Tipo de Problema *</label>
          <select 
            name="tipo" 
            value={formData.tipo} 
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo de problema📌</option>
            <option value="Iluminação pública">Iluminação pública💡</option>
            <option value="Buraco na rua">Buraco na rua 🛣️</option>
            <option value="Lixo acumulado">Lixo acumulado🚯</option>
            <option value="Problema de trânsito">Problema de trânsito 🚦</option>
            <option value="Transporte Publico">Transporte Publico 🚌</option>
            <option value="Segurança">Segurança 🚓</option>
            <option value="Outro">Outro 🧷</option>
          </select>
        </div>

        {/* Descrição */}
        <div className="form-group">
          <label>💬Descrição do Problema *</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva o problema encontrado com o máximo de detalhes possível..."
            rows="5"
            required
          />
          <small>Maximo 60 caracteres</small>
        </div>

        {/* Localização */}
        <div className="form-group">
          <label>📍Localização *</label>
          <input
            type="text"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            placeholder="Ex: Av. Central, 123 - Bairro Centro"
            required
          />
        </div>

        {/* Adicionar Foto */}
        <div className="form-group">
          <label>📂Adicionar Foto</label>
          <div className="photo-upload">
            <div className="upload-area">
              <span className="upload-icon">☁️</span>
              <p>Clique para adicionar uma foto<br />ou arraste e solte aqui</p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            Enviar Solicitação✅
          </button>
          <button type="button" className="btn-cancel">
            Cancelar🚫
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;