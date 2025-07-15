import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.mp4';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* Logo y nombre */}
        <div className="flex flex-col items-center sm:items-start">
          <video
            src={Logo}
            autoPlay
            loop
            muted
            className="w-40 h-60 object-contain mb-2 transition-transform duration-300 hover:scale-105"
          />
          <p className="text-gray-400 text-sm text-center sm:text-left">
            BetoDeportivo - Equipate con estilo y rendimiento.
          </p>
        </div>

        {/* Enlaces útiles */}
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-1">Enlaces</h3>
          <Link to="/Tienda" className="text-gray-300 hover:text-white transition">Tienda</Link>
          <Link to="/Contacto" className="text-gray-300 hover:text-white transition">Contacto</Link>
          <Link to="/Nosotros" className="text-gray-300 hover:text-white transition">Sobre Nosotros</Link>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-1">Seguinos</h3>
          <div className="flex gap-4 text-2xl mt-2">
            <a
              href="https://www.instagram.com/benjazelayaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://wa.me/5491123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisoria y derechos */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BetoDeportivo. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
