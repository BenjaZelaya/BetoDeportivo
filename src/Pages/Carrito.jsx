import React, { useEffect, useState } from 'react';
import PaymentModal from '../Components/Carrito/PaymentModal'; // ajusta la ruta si es distinta

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("carrito");
    if (datosGuardados) {
      setCarrito(JSON.parse(datosGuardados));
    }
  }, []);

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(producto => producto.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.reduce((acc, producto) => acc + Number(producto.precio), 0);

  const handleConfirmPayment = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-16 py-8">
      {/* Lista de productos */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-3xl font-bold mb-6">Mi Carrito</h1>
        {carrito.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          carrito.map((producto, index) => {
            const imagenMostrar = producto.portada || (producto.imagenes?.[0] || '');
            const urlCompleta = `http://localhost:5000${imagenMostrar}`;
            return (
              <div
                key={index}
                className="flex items-center gap-4 mb-6 p-4 border rounded-xl shadow-sm bg-white"
              >
                <img
                  src={urlCompleta}
                  alt={producto.nombre}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{producto.nombre}</h2>
                  <p className="text-gray-600">Categoría: {producto.categoria}</p>
                  <p className="text-gray-600">Color: {producto.color}</p>
                  <p className="text-black font-bold">${producto.precio}</p>
                </div>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Eliminar
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Resumen del carrito */}
      <div className="w-full lg:w-1/3 p-6 bg-gray-100 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Resumen</h2>
        <div className="text-lg mb-2">
          Total productos: {carrito.length}
        </div>
        <div className="text-lg font-semibold mb-6">
          Total a pagar: ${total.toLocaleString()}
        </div>
        <button
          className="w-full py-3 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition"
          disabled={carrito.length === 0}
          onClick={() => setShowModal(true)}
        >
          Pagar
        </button>
      </div>

      {/* MODAL DE PAGO */}
      <PaymentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirmPayment={handleConfirmPayment}
        car={{ name: "tu compra", total }}
      />
    </div>
  );
};

export default Carrito;
