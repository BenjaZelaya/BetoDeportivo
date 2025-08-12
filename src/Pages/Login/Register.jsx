import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      return Swal.fire("Error", "Todos los campos son obligatorios", "error");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return Swal.fire("Error", "El email no es válido", "error");
    }
    if (password.length < 6) {
      return Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
    }

    try {
      const res = await fetch("https://tu-backend.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return Swal.fire("Error", errorData.error || "No se pudo registrar", "error");
      }

      const data = await res.json();

      // Guardar en localStorage
      localStorage.setItem("usuario", JSON.stringify(data));

      // Éxito
      Swal.fire({
        icon: "success",
        title: "Registrado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Error en registro:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
