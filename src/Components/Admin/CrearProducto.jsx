import React, { useState } from 'react';
import axios from 'axios';
import '../Admin/CrearProducto.css';

const CrearProducto = () => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    sexo: '',
    categoria: '',
    color: ''
  });
  const [imagenes, setImagenes] = useState([]);
  const [portadaIndex, setPortadaIndex] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagenesChange = (e) => {
    const nuevas = Array.from(e.target.files).slice(0, 5 - imagenes.length);
    setImagenes(prev => [...prev, ...nuevas]);
  };

  const eliminarImagen = (index) => {
    const nuevas = [...imagenes];
    nuevas.splice(index, 1);
    setImagenes(nuevas);

    if (portadaIndex === index) setPortadaIndex(null);
    else if (portadaIndex > index) setPortadaIndex(portadaIndex - 1);
  };

  const seleccionarPortada = (index) => {
    setPortadaIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const { nombre, descripcion, precio, stock, sexo, categoria, color } = form;

    if (!nombre || !descripcion || !precio || !stock || !sexo || !categoria || !color|| imagenes.length === 0 || portadaIndex === null) {
      setError('❌ Todos los campos (incluidas imágenes y portada) son obligatorios');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    imagenes.forEach(img => data.append('imagenes', img));
    data.append('portadaIndex', portadaIndex);

    try {
      await axios.post('http://localhost:5000/api/productos', data);
      setMensaje('✅ Producto creado con éxito');
      setForm({ nombre: '', descripcion: '', precio: '', stock: '', sexo: '', categoria: '', color: '' });
      setImagenes([]);
      setPortadaIndex(null);
    } catch (error) {
      setError('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="crear-container">
      <h2 className="crear-titulo">Crear Producto</h2>
      <form onSubmit={handleSubmit} className="crear-form">
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />

        <select name="sexo" value={form.sexo} onChange={handleChange} required>
          <option value="">Seleccione sexo</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Niño">Niño</option>
        </select>

        <select name="categoria" value={form.categoria} onChange={handleChange} required>
          <option value="">Seleccione categoría</option>
          <option value="Ropa">Ropa</option>
          <option value="Calzado">Calzado</option>
          <option value="Deportes">Deportes</option>
        </select>

        <select name="color" value={form.color} onChange={handleChange} required>
          <option value="">Seleccione Color</option>
          <option value="Amarillo">Amarillo</option>
          <option value="Azul">Azul</option>
          <option value="Rojo">Rojo</option>
          <option value="Verde">Verde</option>
          <option value="Negro">Negro</option>
          <option value="Blanco">Blanco</option>
          <option value="Gris">Gris</option>
          <option value="Naranja">Naranja</option>
          <option value="Rosa">Rosa</option>
        </select>

        <input type="file" onChange={handleImagenesChange} accept="image/*" multiple />

        <div className="vista-previa">
          {imagenes.map((img, i) => (
            <div key={i} className="preview-item">
              <img src={URL.createObjectURL(img)} alt={`preview-${i}`} />
              <div className="preview-actions">
                <button type="button" onClick={() => eliminarImagen(i)} className="btn-eliminar">❌</button>
                <button
                  type="button"
                  onClick={() => seleccionarPortada(i)}
                  className={`btn-portada ${portadaIndex === i ? 'seleccionada' : ''}`}
                  title="Marcar como portada"
                >⭐</button>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="crear-btn">Crear Producto</button>
      </form>
      {mensaje && <p className="crear-mensaje">{mensaje}</p>}
      {error && <p className="crear-error">{error}</p>}
    </div>
  );
};

export default CrearProducto;
