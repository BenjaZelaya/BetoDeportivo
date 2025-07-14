import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Admin/AdminTabla.css';

const AdminTabla = () => {
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState('asc');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/productos');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al obtener productos', error);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/productos/${id}`);
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  const ordenarPorCategoria = () => {
    const ordenado = [...productos].sort((a, b) => {
      if (orden === 'asc') {
        return a.categoria.localeCompare(b.categoria);
      } else {
        return b.categoria.localeCompare(a.categoria);
      }
    });
    setProductos(ordenado);
    setOrden(orden === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="AdminTabla-container">
      <h2>Lista de Productos</h2>
      <button onClick={ordenarPorCategoria}>Ordenar por Categoría ({orden})</button>
      <table className="AdminTabla-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Sexo</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>{p.sexo}</td>
              <td>{p.categoria}</td>
              <td>
                <button onClick={() => eliminarProducto(p.id)}>🗑️ Eliminar</button>
                <button onClick={() => alert(`Editar producto: ${p.nombre}`)}>✏️ Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTabla;
