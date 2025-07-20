import React from 'react';
import Tienda from '../Tienda';

const Hombre = () => {
  return (
    <div>
      {/* Banner opcional */}
      <div className="bg-blue-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Sección Hombre</h1>
        <p className="text-lg">Ropa, calzado y más para hombres</p>
      </div>

      {/* Reutilizamos el componente Tienda con el filtro fijo */}
      <Tienda sexoFijo="hombre" />
    </div>
  );
};

export default Hombre;
