import React from 'react';
import Tienda from '../Tienda';

const Mujer = () => {
  return (
    <div>
      <div className="bg-pink-500 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Sección Mujer</h1>
        <p className="text-lg">Moda y deporte para mujeres</p>
      </div>

      <Tienda sexoFijo="mujer" />
    </div>
  );
};

export default Mujer;
