import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../Admin/AdminTabla.css';

Modal.setAppElement('#root');

const AdminTabla = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevasImagenes, setNuevasImagenes] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get('http://localhost:5000/api/productos');
    setProductos(res.data);
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    await axios.delete(`http://localhost:5000/api/productos/${id}`);
    cargarProductos();
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditando({ ...producto });
    setNuevasImagenes([]);
    setModalAbierto(true);
  };

  const handleEditarChange = (e) => {
    const { name, value } = e.target;
    setProductoEditando(prev => ({ ...prev, [name]: value }));
  };

  const handleNuevasImagenes = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) return alert('Máximo 5 imágenes');
    setNuevasImagenes(files);
  };

  const guardarCambios = async () => {
    const data = new FormData();
    Object.entries(productoEditando).forEach(([key, val]) => data.append(key, val));
    nuevasImagenes.forEach(file => data.append('imagenes', file));

    try {
      await axios.put(`http://localhost:5000/api/productos/${productoEditando.id}`, data);
      setModalAbierto(false);
      cargarProductos();
    } catch (err) {
      alert('Error al guardar cambios');
    }
  };

  return (
    <div className="AdminTabla-container">
      <h2>Lista de Productos</h2>
      <table className="AdminTabla-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Sexo</th>
            <th>Categoría</th>
            <th>Imágenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion.slice(0, 30)}{p.descripcion.length > 30 && '...'}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>{p.sexo}</td>
              <td>{p.categoria}</td>
              <td>
                {(p.imagenes || []).map((img, i) => (
                  <img key={i} src={`http://localhost:5000${img}`} alt="mini" width="50" />
                ))}
              </td>
              <td>
                <button onClick={() => eliminarProducto(p.id)}>🗑️</button>
                <button onClick={() => abrirModalEdicion(p)}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal isOpen={modalAbierto} onRequestClose={() => setModalAbierto(false)} contentLabel="Editar Producto">
        {productoEditando && (
          <div>
            <h3>Editar Producto</h3>
            <input name="nombre" value={productoEditando.nombre} onChange={handleEditarChange} />
            <textarea name="descripcion" value={productoEditando.descripcion} onChange={handleEditarChange} />
            <input type="number" name="precio" value={productoEditando.precio} onChange={handleEditarChange} />
            <input type="number" name="stock" value={productoEditando.stock} onChange={handleEditarChange} />

            <select name="sexo" value={productoEditando.sexo} onChange={handleEditarChange}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño">Niño</option>
            </select>

            <select name="categoria" value={productoEditando.categoria} onChange={handleEditarChange}>
              <option value="Ropa">Ropa</option>
              <option value="Calzado">Calzado</option>
              <option value="Deporte">Deporte</option>
              <option value="Accesorios">Accesorios</option>
            </select>

            <input type="file" multiple accept="image/*" onChange={handleNuevasImagenes} />
            {productoEditando.imagenes?.map((img, i) => (
              <img key={i} src={`http://localhost:5000${img}`} alt="existente" width="60" />
            ))}

            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={() => setModalAbierto(false)}>Cancelar</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminTabla;
