import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire('Error', 'Completa todos los campos', 'error');
      return;
    }

    try {
      const res = await fetch('https://tu-backend.onrender.com/api/usuarios');
      const usuarios = await res.json();

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      if (!usuarioEncontrado) {
        Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        timer: 1500,
        showConfirmButton: false
      });

      localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));

      navigate('/');
    } catch (error) {
      Swal.fire('Error', 'No se pudo iniciar sesión', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
