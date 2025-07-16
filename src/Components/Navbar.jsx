import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/Logo.mp4';

const Navbar = () => {
  const navLinks = [
    { name: 'Destacados', path: '/Tienda' },
    { name: 'Hombre', path: '/Tienda' },
    { name: 'Mujer', path: '/Tienda' },
    { name: 'Niño/a', path: '/Tienda' },
    { name: 'Accesorios', path: '/Tienda' },
    { name: 'Oportunidades', path: '/Tienda' },
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
    <div className="Navbar-container">
      <div ref={ref} className="h-25 md:h-64">
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-40 bg-black ${
          isScrolled ? 'bg-black/80 shadow-md backdrop-blur-lg py-3 md:py-4' : 'py-4 md:py-6'
        }`}>
          {/* Logo */}
          <Link to="/" className="h-20 flex items-center gap-2">
            <video src={Logo} autoPlay loop muted playsInline className="h-20 w-40 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={`group relative flex flex-col items-center no-underline transition-colors duration-300 ${
                  isScrolled ? 'text-gray-300' : 'text-white'
                }`}
              >
                <span>{link.name}</span>
                <span className="absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ease-in-out w-0 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Search & Login */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setIsSearchVisible(!isSearchVisible)}>
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <Link to="/Admin">
              <button className="bg-white text-black px-6 py-2 rounded-full">Login</button>
            </Link>
          </div>

          {/* Search Input */}
          {isSearchVisible && (
            <form onSubmit={handleSearchSubmit} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black px-4 py-2 rounded-md shadow-lg w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full p-2 rounded text-black"
              />
            </form>
          )}

          {/* Mobile Menu Btn */}
          <div className="md:hidden flex items-center gap-3">
            <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-6 w-6 cursor-pointer text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
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

          <Link to="/Admin" className="mt-6">
            <button className="bg-white text-black px-6 py-2 rounded-full">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
