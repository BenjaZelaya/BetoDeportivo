import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Style/Tienda.css';

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [numProductos, setNumProductos] = useState(0);
  const [isFiltroOpen, setIsFiltroOpen] = useState(false);
  const [filtros, setFiltros] = useState({ precio: '', categoria: '', sexo: '' });

  const location = useLocation();

  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  };

  useEffect(() => {
    const query = getQuery();
    const url = query.trim()
      ? `http://localhost:5000/api/productos/buscar?q=${encodeURIComponent(query)}`
      : 'http://localhost:5000/api/productos';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
          setProductosFiltrados(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setProductos([]);
          setProductosFiltrados([]);
        }
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setProductos([]);
        setProductosFiltrados([]);
      });
  }, [location.search]);

  useEffect(() => {
    let filtrados = [...productos];

    if (filtros.categoria) {
      filtrados = filtrados.filter(p => p.categoria?.toLowerCase() === filtros.categoria);
    }

    if (filtros.sexo) {
      filtrados = filtrados.filter(p => p.sexo?.toLowerCase() === filtros.sexo);
    }

    if (filtros.precio === 'menor') {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (filtros.precio === 'mayor') {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    setProductosFiltrados(filtrados);
    setNumProductos(filtrados.length);
  }, [filtros, productos]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  return (
    <>
      {/* Filtro lateral */}
      <div
        className={`tienda-filtros fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ${isFiltroOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Filtrar productos</h2>
          <button onClick={() => setIsFiltroOpen(false)} className="text-gray-600 hover:text-black text-xl">&times;</button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block font-medium mb-1">Precio</label>
            <select name="precio" value={filtros.precio} onChange={handleFiltroChange} className="w-full border rounded px-3 py-2">
              <option value="">Todos</option>
              <option value="menor">Menor a mayor</option>
              <option value="mayor">Mayor a menor</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Categoría</label>
            <select name="categoria" value={filtros.categoria} onChange={handleFiltroChange} className="w-full border rounded px-3 py-2">
              <option value="">Todas</option>
              <option value="calzado">Calzado</option>
              <option value="ropa">Ropa</option>
              <option value="Comprar por Deporte">Comprar por Deporte</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Sexo</label>
            <select name="sexo" value={filtros.sexo} onChange={handleFiltroChange} className="w-full border rounded px-3 py-2">
              <option value="">Todos</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="niño">Niño/a</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fondo oscurecido cuando panel abierto */}
      {isFiltroOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsFiltroOpen(false)}
        />
      )}

      {/* Productos */}
      <div className="pt-36 px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">BetoDeportivo</h1>
            <h3 className="text-xl text-gray-600">{numProductos} productos</h3>
          </div>
          <div>
            <button
              onClick={() => setIsFiltroOpen(true)}
              className="top-28 right-4 z-50 bg-black text-white px-4 py-2 rounded shadow-lg hover:bg-gray-800 transition"
            >
              FILTRAR Y ORDENAR
            </button>
          </div>
        </div>

        {productosFiltrados.length === 0 ? (
          <p className="text-gray-600">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosFiltrados.map(p => (
              <div
                key={p.id}
                className="border border-gray-200 p-4 rounded-lg bg-white shadow hover:shadow-md transition"
              >
                <img
                  src={
                    p.portada
                      ? `http://localhost:5000${p.portada}`
                      : 'http://localhost:5000/uploads/default.png'
                  }
                  alt={p.nombre}
                  className="w-full h-30 object-cover rounded mb-3"
                />
                <p className="text-black font-bold">${p.precio}</p>
                <h3 className="text-lg font-semibold">{p.nombre}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tienda;
