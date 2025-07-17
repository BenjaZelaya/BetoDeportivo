import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductoSimilares from '../Components/Vista De Productos/ProductoSimilares';
import { div } from 'framer-motion/client';

const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenPrincipal, setImagenPrincipal] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setImagenPrincipal(`http://localhost:5000${data.portada || data.imagenes?.[0]}`);
      })
      .catch(err => console.error('Error al cargar producto:', err));
  }, [id]);

  if (!producto) {
    return <div className="p-10 text-center text-lg">Cargando producto...</div>;
  }

  return (
    <div>
      <div className='mx-8 display-flex flex-row gap-2 my-4 text-sm '>
        <div>
        <span><a href="/" className="text-gray-500 hover:text-gray-800 text-decoration-none">Home/</a></span>
        <span><a href="/Tienda" className="text-gray-500 hover:text-gray-800 text-decoration-none">{producto.categoria}/</a></span>
        <Link to={`/Tienda/${producto.id}`} className="text-gray-500 hover:text-gray-800 text-decoration-none">{producto.nombre}</Link>
        </div>
      </div>
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Izquierda: Galería */}
        <div className="flex flex-col items-start">
          <img
            src={imagenPrincipal}
            alt="imagen principal"
            className="w-full h-96 object-cover rounded border shadow mb-4"
          />

          {/* Miniaturas */}
          <div className="flex gap-2">
            {producto.imagenes?.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000${img}`}
                alt={`miniatura-${i}`}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${imagenPrincipal.endsWith(img) ? 'ring-2 ring-black' : ''}`}
                onClick={() => setImagenPrincipal(`http://localhost:5000${img}`)}
              />
            ))}
          </div>
        </div>

        {/* Derecha: Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
          <h3 className='text-gray-600'>{producto.color}</h3>
          <p><a href="/Tienda" className="text-gray-500 hover:text-gray-800 text-decoration-none">{producto.categoria} • {producto.sexo}</a></p>
          <p className="text-2xl font-semibold text-black ">${producto.precio}</p>
          <p className="text-md text-gray-700">{producto.descripcion}</p>
          <button className="mt-4 w-fit px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
            Añadir al carrito
          </button>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className="text-2xl font-bold mx-4">Productos similares</h2>
        <ProductoSimilares
          categoriaActual={producto.categoria}
          idActual={producto.id}
        />
      </div>
    </div>
  );
};

export default Producto;
