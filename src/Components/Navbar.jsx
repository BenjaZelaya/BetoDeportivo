import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { BsBagCheck, BsBookmarkHeart } from "react-icons/bs";
import Logo from '../assets/Logo.mp4';

const Navbar = () => {
  const navLinks = [
    { name: 'Destacados', path: '/tienda' },
    { name: 'Hombre', path: '/hombre' },
    { name: 'Mujer', path: '/mujer' },
    { name: 'Niño/a', path: '/nino' },
    { name: 'Accesorios', path: '/tienda?categoria=accesorios' },
    { name: 'Oportunidades', path: '/tienda?ofertas=true' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [user, setUser] = useState(null);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(ref.current?.scrollTop > 10);
    };
    ref.current?.addEventListener('scroll', handleScroll);
    return () => ref.current?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Revisar si hay usuario logueado
    const loggedUser = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado');
    setUser(null);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/Tienda?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchVisible(false);
    setSearchQuery('');
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="Navbar-container">
        <div ref={ref} className="h-25 md:h-64">

          <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-auto md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-30 bg-black ${isScrolled ? 'bg-black/80 shadow-md backdrop-blur-lg py-3 md:py-4' : 'py-4 md:py-6'}`}>
            <div className="fixed top-0 left-0 w-full h-9 text-white text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
              <p>¡¿Que estas esperando?! <span className="underline underline-offset-2">Ofertas hoy!!!</span></p>
            </div>

            {/* Logo */}
            <Link to="/" className="h-20 flex items-center gap-2">
              <video src={Logo} autoPlay loop muted playsInline className="h-20 w-40 object-contain" />
            </Link>

            {/* NAV LINKS o INPUT */}
            <div className="flex-1 flex justify-center">
              <AnimatePresence mode="wait">
                {!isSearchVisible ? (
                  <motion.div
                    key="nav-links"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:flex items-center gap-6 lg:gap-10"
                  >
                    {navLinks.map((link, i) => (
                      <Link
                        key={i}
                        to={link.path}
                        className={`group relative flex flex-col items-center no-underline transition-colors duration-300 ${isScrolled ? 'text-gray-300' : 'text-white'}`}
                      >
                        <span>{link.name}</span>
                        <span className="absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ease-in-out w-0 group-hover:w-full" />
                      </Link>
                    ))}
                  </motion.div>
                ) : (
                  <motion.form
                    key="search-input"
                    onSubmit={handleSearchSubmit}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-md flex justify-center"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      placeholder="Buscar producto..."
                      className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none transition-all duration-300"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Botones derecha */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="text-2xl text-gray-100 hover:text-gray-500 transition">
                {isSearchVisible ? (
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-gray-100 hover:text-gray-500 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )}
              </button>

              <Link to="/Carrito" className="text-2xl text-gray-100 hover:text-gray-500 transition">
                <BsBagCheck />
              </Link>

              <Link to="/Favoritos" className='text-2xl text-gray-100 hover:text-gray-500 transition'>
                <BsBookmarkHeart />
              </Link>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              ) : (
                <>
                  <Link to="/Login" >
                    <button className="bg-white text-gray-800 hover:text-gray-500 transition px-6 py-2 rounded-full">Login</button>
                  </Link>
                  <Link to="/Register" >
                    <button className="bg-white text-gray-800 hover:text-gray-500 transition px-6 py-2 rounded-full">Register</button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
