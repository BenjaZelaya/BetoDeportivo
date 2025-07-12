import React from 'react'
import '../Style/Navbar.css'
import { div } from 'framer-motion/client';
import Logo from '../assets/Logo.mp4';

const Navbar = () => {
    const navLinks = [
        { name: 'Destacados', path: '/Tienda' },
        { name: 'Hombre', path: '/' },
        { name: 'Mujer', path: '/' },
        { name: 'Niño/a', path: '/Admin' },
        { name: 'Accesorios', path: '/' },
        { name: 'Oportunidades', path: '/' },
    ];

    const ref = React.useRef(null);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(ref.current.scrollTop > 10);
        };
        ref.current.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className='Navbar-Container'>
            <div ref={ref} className="h-25 md:h-64">
                <nav className={`Navbar-Main bg-black fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-black/80 shadow-md backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                    {/* Video Logo */}
                    <a href="/" className="Navbar-Logo h-20 flex items-center gap-2">
                        <video
                            src={Logo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="Navbar-LogoVideo h-14 w-auto object-contain"
                        />
                    </a>

                    {/* Desktop Nav */}
                    <div className="Navbar-Links hidden md:flex items-center gap-4 lg:gap-8">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.path}
                                className={`Navbar-Link group flex flex-col gap-0.5 no-underline ${isScrolled ? "text-gray-300" : "text-white"}`}>
                                <span className="Navbar-Text">{link.name}</span>
                                <div className={`Navbar-Underline ${isScrolled ? "bg-gray-300" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                            </a>
                        ))}
                    </div>

                    {/* Desktop Right */}
                    <div className="Navbar-Right hidden md:flex items-center gap-4">
                        <svg className={`Navbar-Icon h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <button className={`Navbar-Button px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="Navbar-MobileBtn flex items-center gap-3 md:hidden">
                        <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className="Navbar-Hamburger h-6 w-6 cursor-pointer text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                        </svg>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`Navbar-MobileMenu fixed top-0 left-0 w-full h-screen bg-black text-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        {/* Logo en el menú móvil */}
                        <div className="Navbar-MobileLogo absolute top-6">
                            <video
                                src={Logo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="Navbar-LogoVideo h-14 w-auto object-contain"
                            />
                        </div>

                        <button className="Navbar-CloseBtn absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="flex flex-col gap-6 mt-24">
                            {navLinks.map((link, i) => (
                                <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)} className="Navbar-MobileLink no-underline text-white text-lg">
                                    {link.name}
                                </a>
                            ))}

                            <button className="Navbar-NewLaunch border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all border-white text-white">
                                New Launch
                            </button>

                            <button className="Navbar-Button bg-white text-black px-8 py-2.5 rounded-full transition-all duration-500">
                                Login
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
