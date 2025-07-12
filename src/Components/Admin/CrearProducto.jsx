import React, { useState } from 'react';
import '../Admin/CrearProducto.css';

const CrearProducto = () => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!form.nombre || !form.descripcion || !form.precio || !form.stock) {
      setError('❌ Todos los campos son obligatorios');
      return;
    }

    const data = new FormData();
    data.append('nombre', form.nombre);
    data.append('descripcion', form.descripcion);
    data.append('precio', form.precio);
    data.append('stock', form.stock);
    if (imagen) data.append('imagen', imagen);

    try {
      const res = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        setMensaje('✅ Producto creado con éxito');
        setForm({ nombre: '', descripcion: '', precio: '', stock: '' });
        setImagen(null);
        // Opcional: reset input file
        e.target.reset();
      } else {
        const data = await res.json();
        setError(`❌ Error del servidor: ${data.message || 'Intenta nuevamente'}`);
      }
    } catch {
      setError('❌ No se pudo conectar al servidor');
    }
  };

  return (
    <div className="CrearProducto-container">
      <h2 className="CrearProducto-titulo">Crear Producto</h2>
      <form onSubmit={handleSubmit} className="CrearProducto-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          className="CrearProducto-input"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="CrearProducto-textarea"
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="CrearProducto-input"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Cantidad en stock"
          value={form.stock}
          onChange={handleChange}
          className="CrearProducto-input"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="CrearProducto-input"
        />
        <button type="submit" className="CrearProducto-button">Crear Producto</button>
      </form>
      {mensaje && <p className="CrearProducto-mensaje">{mensaje}</p>}
      {error && <p className="CrearProducto-error">{error}</p>}
    </div>
  );
};

export default CrearProducto;
