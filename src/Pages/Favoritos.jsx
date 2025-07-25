import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(data);
  }, []);

  const eliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter(p => p.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

    Swal.fire({
      icon: 'success',
      title: 'Eliminado de favoritos',
      timer: 1000,
      showConfirmButton: false
    });
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Tus Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="text-gray-600">No tienes productos en tus favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((producto) => (
            <div key={producto.id} className="border rounded-lg shadow-md p-4 flex flex-col bg-white hover:shadow-lg transition">
              <img
                src={`https://betodeportivo-backend.onrender.com${producto.portada || producto.imagenes?.[0]}`}
                alt={producto.nombre}
                className="w-full h-56 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{producto.nombre}</h2>
              <p className="text-gray-600">{producto.categoria} • {producto.sexo}</p>
              <p className="text-black text-xl font-bold my-2">${producto.precio}</p>
              <div className="flex justify-between mt-auto pt-4">
                <Link
                  to={`/Tienda/${producto.id}`}
                  className="text-sm text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Ver
                </Link>
                <button
                  onClick={() => eliminarFavorito(producto.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
