import React from 'react';
import { useNavigate } from 'react-router-dom';

import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';

const CuadriculaImagenes = () => {
  const navigate = useNavigate();

  const data = [
    { img: img6, texto: 'Ropa para combinar tus Vomero.' },
    { img: img7, texto: 'Nuevos estilos Invierno 2025.' },
    { img: img8, texto: 'Perseguí lo legendario.' },
    { img: img9, texto: 'Dominá la cancha.' },
  ];

  const handleClick = () => {
    navigate('/Tienda');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 py-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative group overflow-hidden rounded-xl shadow-lg h-[300px] md:h-[400px]"
        >
          <img
            src={item.img}
            alt={item.texto}
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
          />

          {/* Filtro oscuro para mejorar contraste */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-300 z-10"></div>

          {/* Texto y botón */}
          <div className="absolute bottom-6 left-6 z-20 text-white max-w-[80%]">
            <p className="text-xl font-semibold mb-3 drop-shadow-xl leading-tight">
              {item.texto}
            </p>
            <button
              onClick={handleClick}
              className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition-all"
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CuadriculaImagenes;

