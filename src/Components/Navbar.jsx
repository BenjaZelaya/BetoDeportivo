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
    { name: 'Oportunidades', path: '/tienda?ofertas=true' }, // si luego quieres filtrar por promociones
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(ref.current?.scrollTop > 10);
    };
    ref.current?.addEventListener('scroll', handleScroll);
    return () => ref.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/Tienda?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchVisible(false);
    setSearchQuery('');
    setIsMenuOpen(false); // cerrar en mobile
  };

  return (
    <>
      <div className="Navbar-container">
        <div ref={ref} className="h-25 md:h-64">

          <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-auto md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-30 bg-black ${isScrolled ? 'bg-black/80 shadow-md backdrop-blur-lg py-3 md:py-4' : 'py-4 md:py-6'}`}>
            <div class="fixed top-0 left-0 w-full h-9 text-white text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
              <p>¡¿Que estas esperando?! <span class="underline underline-offset-2">Ofertas hoy!!!</span></p>
            </div>
            {/* Logo */}
            <Link to="/" className="h-20 flex items-center gap-2">
              <video src={Logo} autoPlay loop muted playsInline className="h-20 w-40 object-contain" />
            </Link>

            {/* NAV LINKS u INPUT */}
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
              <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="text-2xl text-gray-100 hover:text-gray-500 text-decoration-none transition">
                {isSearchVisible ? (
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-gray-100 hover:text-gray-500 text-decoration-none transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )}
              </button>

              <Link to="/Carrito" className=" text-2xl text-gray-100 hover:text-gray-500 text-decoration-none transition">
                <BsBagCheck />
              </Link>

              <Link to="/Favoritos" className='text-2xl text-gray-100 hover:text-gray-500 text-decoration-none transition'>
                <BsBookmarkHeart />
              </Link>

              <Link to="/Admin" >
                <button className="bg-white text-gray-800 hover:text-gray-500 text-decoration-none transition px-6 py-2 rounded-full">Login</button>
              </Link>
            </div>

            {/* Botón hamburguesa para mobile */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(true)} className="text-2xl text-gray-100 hover:text-gray-500 text-decoration-none transition">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </nav>


          {/* Mobile Menu */}
          <div className={`fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col md:hidden items-center overflow-y-auto pt-24 px-4 transition duration-300 z-30 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="absolute top-4 right-4">
              <svg onClick={() => setIsMenuOpen(false)} className="h-6 w-6 text-white cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <video src={Logo} autoPlay loop muted playsInline className="h-16 mb-6" />

            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-white text-lg no-underline my-2">
                {link.name}
              </Link>
            ))}

            <form onSubmit={handleSearchSubmit} className="w-full px-4 mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full p-2 rounded text-black"
              />
            </form>

            <Link to="/Carrito" className="mt-6 text-4xl text-gray-100 hover:text-gray-500 text-decoration-none transition">
              <BsBagCheck />
            </Link>


            <Link to="/Admin" className="mt-6">
              <button className="bg-white text-black px-6 py-2 rounded-full">Login</button>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
