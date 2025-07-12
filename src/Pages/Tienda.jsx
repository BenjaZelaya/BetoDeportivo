import React, { useEffect, useState } from 'react';

const Tienda = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/productos')  // Asegúrate que el puerto coincide con el backend
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div>
      <h1>Tienda</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {productos.map(p => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={p.imagenUrl} alt={p.nombre} style={{ width: '100%' }} />
            <h3>{p.nombre}</h3>
            <p><strong>${p.precio}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tienda;
