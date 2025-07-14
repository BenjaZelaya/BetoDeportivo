// Tienda.jsx actualizado con soporte de búsqueda y estilo Tailwind
import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [numProductos, setNumProductos] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setNumProductos(productos.length);
  }, [productos]);

  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  };

  useEffect(() => {
    const query = getQuery();
    const url = query.trim()
      ? `http://localhost:5000/api/productos/buscar?q=${encodeURIComponent(query)}`
      : 'http://localhost:5000/api/productos';

    fetch(url)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, [location.search]);

  return (
    <>
    <div className="pt-32 px-4">
      <h1 className="text-3xl font-bold mb-6">BetoDeportivo</h1>
      <h3 className='text-2xl font-bold mb-6'>{numProductos} Productos</h3>

      {productos.length === 0 ? (
        <p className="text-gray-600">No se encontraron productos.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {productos.map(p => (
            <div
              key={p.id}
              className="w-48 border border-gray-300 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={`http://localhost:5000${p.imagenUrl || '/uploads/default.png'}`}
                alt={p.nombre}
                className="w-full h-44 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{p.nombre}</h3>
              <p className="text-black font-bold">${p.precio}</p>
              
            </div>         
          ))}
        </div>
      )}
      <div>
      </div>
    </div>
    </>
  );
};

export default Tienda;

