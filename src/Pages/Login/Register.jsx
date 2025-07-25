// src/Pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await fetch('https://betodeportivo-backend.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.status === 201) {
        Swal.fire('¡Registrado!', 'Te registraste correctamente', 'success');
        navigate('/homepage');
      } else {
        const data = await res.json();
        setError(data.message || 'Error al registrar');
      }
    } catch (err) {
      setError('Error del servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded p-2"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full border border-gray-300 rounded p-2"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full border border-gray-300 rounded p-2"
            onChange={handleChange}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
