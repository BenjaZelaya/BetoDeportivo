import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductoSimilares from '../Components/Vista De Productos/ProductoSimilares';
import { BsBookmarkHeart } from "react-icons/bs";
import Swal from 'sweetalert2';

const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenPrincipal, setImagenPrincipal] = useState('');

  useEffect(() => {
    fetch(` https://betodeportivo-backend.onrender.com/api/productos/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data);
        setImagenPrincipal(` https://betodeportivo-backend.onrender.com${data.portada || data.imagenes?.[0]}`);
      })
      .catch(err => console.error('Error al cargar producto:', err));
  }, [id]);

  if (!producto) {
    return <div className="p-10 text-center text-lg">Cargando producto...</div>;
  }

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const yaExiste = carritoActual.some(p => p.id === producto.id);

    if (yaExiste) {
      Swal.fire({
        icon: 'info',
        title: 'Ya está en el carrito',
        text: 'Este producto ya fue agregado.',
        confirmButtonColor: '#000'
      });
      return;
    }

    const nuevoCarrito = [...carritoActual, producto];
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    Swal.fire({
      icon: 'success',
      title: '¡Producto añadido!',
      text: `${producto.nombre} fue agregado al carrito.`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  return (
    <div>
      <div className='mx-8 display-flex flex-row gap-2 my-4 text-sm '>
        <div>
          <span><a href="/" className="text-gray-500 hover:text-gray-800">Home/</a></span>
          <span><a href="/Tienda" className="text-gray-500 hover:text-gray-800">{producto.categoria}/</a></span>
          <Link to={`/Tienda/${producto.id}`} className="text-gray-500 hover:text-gray-800">{producto.nombre}</Link>
        </div>
      </div>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Izquierda: Galería */}
        <div className="flex flex-col items-start">
          <img
            src={imagenPrincipal}
            alt="imagen principal"
            className="w-full h-auto object-cover rounded border shadow mb-4"
          />
          {/* Miniaturas */}
          <div className="flex gap-2">
            {producto.imagenes?.map((img, i) => (
              <img
                key={i}
                src={` https://betodeportivo-backend.onrender.com${img}`}
                alt={`miniatura-${i}`}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${imagenPrincipal.endsWith(img) ? 'ring-2 ring-black' : ''}`}
                onClick={() => setImagenPrincipal(` https://betodeportivo-backend.onrender.com${img}`)}
              />
            ))}
          </div>
        </div>

        {/* Derecha: Info */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xxl font-bold">{producto.nombre}</h1>
          <h3 className='text-gray-600 text-3xl'>{producto.color}</h3>
          <p><a href="/Tienda" className="text-gray-500 hover:text-gray-800">{producto.categoria} • {producto.sexo}</a></p>
          <p className="text-2xl font-semibold text-black ">${producto.precio}</p>
          <p className="text-2xl text-gray-700">{producto.descripcion}</p>

          <div className='w-full h-full flex items-end'>
            <button
              className="mt-auto w-auto h-20 px-6 py-3 bg-black text-white text-xl rounded hover:bg-gray-800 transition"
              onClick={() => agregarAlCarrito(producto)}
            >
              Añadir al carrito
            </button>
            <div className='mt-auto w-auto h-20 px-6 py-3 bg-white text-black text-4xl rounded hover:bg-gray-800 transition'>
              <Link to="/Favoritos" className='text-gray-700 hover:text-black'><BsBookmarkHeart /></Link>
            </div>
          </div>
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
