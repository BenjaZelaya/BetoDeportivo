import React, { useEffect, useState } from 'react'; 
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

const ProductoSimilares = ({ categoriaActual, idActual }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://betodeportivo-backend.onrender.com')
      .then(res => res.json())
      .then(data => {
        const similares = data.filter(p => p.categoria === categoriaActual && p.id !== idActual);
        setProductos(similares);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, [categoriaActual, idActual]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  if (productos.length === 0) return null;

  return (
    <div className="container mx-auto px-4">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        arrows
        showDots={true}
        containerClass="carousel-container"
        itemClass="px-2"
      >
        {productos.map(p => (
          <Link
            to={`/producto/${p.id}`}
            key={p.id}
            className="no-underline text-black"
          >
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <img
                src={`http://localhost:5000${p.portada || p.imagenes?.[0]}`}
                alt={p.nombre}
                className="w-full h-auto object-cover rounded mb-3 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-lg font-semibold">{p.nombre}</h3>
              <p className="text-gray-500">{p.categoria}</p>
              <p className="text-black font-bold mt-2">${p.precio}</p>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductoSimilares;
