import React from 'react';
import Tienda from '../Tienda';

const Niño = () => {
  return (
    <div>
      <div className="bg-yellow-400 text-black py-10 text-center">
        <h1 className="text-4xl font-bold">Sección Niño/a</h1>
        <p className="text-lg">Productos ideales para los más chicos</p>
      </div>

      <Tienda sexoFijo="niño" />
    </div>
  );
};

export default Niño;
