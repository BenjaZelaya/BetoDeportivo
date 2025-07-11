// src/Pages/CuadriculaImagenes.jsx
import React from 'react';
import '../Style/CuadriculaImagenes.css';

import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';

const CuadriculaImagenes = () => {
  const data = [
    { img: img6, texto: 'Ropa para combinar tus Vomero.' },
    { img: img7, texto: 'Nuevos estilos Invierno2025.' },
    { img: img8, texto: 'Perseguí lo legendario' },
    { img: img9, texto: 'Dominá la Cancha.' },
  ];

  return (
    <div className="Cuadricula-Grid-Homepage">
      {data.map((item, index) => (
        <div key={index} className="Cuadricula-Columna-Homepage">
          <div className="Cuadricula-Overlay-Homepage">
            <p className="Cuadricula-Texto-Homepage">{item.texto}</p>
            <button className="Cuadricula-Boton-Homepage">Comprar Ahora</button>
          </div>
          <img src={item.img} alt={item.texto} className="Cuadricula-Imagen-Homepage" />
        </div>
      ))}
    </div>
  );
};

export default CuadriculaImagenes;
