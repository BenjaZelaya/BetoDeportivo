import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';


const NuevosProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://betodeportivo-backend.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => {
        // ordenar por ID descendente y tomar los 6 más nuevos
        const recientes = [...data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);
        setProductos(recientes);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  return (
    <div className="container mx-auto mt-10 px-4">
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
            className=" no-underline text-black"
          >
            <div key={p.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <img
                src={` https://betodeportivo-backend.onrender.com${p.portada || p.imagenes?.[0]}`}
                alt={p.nombre}
                className="w-full h-auto object-cover rounded mb-3"
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

export default NuevosProductos;
