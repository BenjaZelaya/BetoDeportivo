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
    categoria: ''
  });
  const [imagen, setImagen] = useState(null); // NUEVO
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const { nombre, descripcion, precio, stock, sexo, categoria } = form;

    if (!nombre || !descripcion || !precio || !stock || !sexo || !categoria || !imagen) {
      setError('❌ Todos los campos (incluida la imagen) son obligatorios');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append('imagen', imagen); // AÑADIR IMAGEN

    try {
      await axios.post('http://localhost:5000/api/productos', data);
      setMensaje('✅ Producto creado con éxito');
      setForm({ nombre: '', descripcion: '', precio: '', stock: '', sexo: '', categoria: '' });
      setImagen(null);
    } catch (error) {
      setError('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="CrearProducto-container">
      <h2 className="CrearProducto-titulo">Crear Producto</h2>
      <form onSubmit={handleSubmit} className="CrearProducto-form" encType="multipart/form-data">
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
          <option value="Comprar por Deporte">Comprar por Deporte</option>
        </select>

        <input type="file" name="imagen" onChange={handleImagenChange} accept="image/*" required />

        <button type="submit" className="CrearProducto-button">Crear Producto</button>
      </form>
      {mensaje && <p className="CrearProducto-mensaje">{mensaje}</p>}
      {error && <p className="CrearProducto-error">{error}</p>}
    </div>
  );
};

export default CrearProducto;
