// src/pages/form.jsx
import { useState } from 'react';
import '../styles/form.css';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';

function Form() {
  const navigate = useNavigate();
  const { createPost, loading, error } = usePost();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    imageBase64: '',
    mimeType: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPost(formData);
    if (!result.success) {
      alert(result.message);
      return;
    }
    alert('Denúncia enviada com sucesso! Obrigado por contribuir para a melhoria da sua cidade! 🚀');
    navigate('/acompanhar');
    console.log('Dados enviados:', formData);
  };

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;

      // result exemplo:
      // data:image/png;base64,iVBORw0KGgo...

      const base64 = result.split(",")[1];

      setFormData({
        ...formData,
        imageBase64: base64,
        mimeType: file.type,
      });
    };

    reader.readAsDataURL(file);
  }

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
            name="title"
            value={formData.title}
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
            name="description"
            value={formData.description}
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
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ex: Av. Central, 123 - Bairro Centro"
            required
          />
        </div>
        {/* Adicionar Foto */}
        <div className="form-group">
          <label>📂Adicionar Foto</label>
          <label className="photo-upload">
            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </label>
        </div>

        {/* Botões */}
        <div className="form-buttons">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '⏳Enviando...' : 'Enviar Solicitação✅'}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
            Cancelar🚫
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;