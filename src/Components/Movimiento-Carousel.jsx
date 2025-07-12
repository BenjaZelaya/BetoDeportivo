import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Style/Movimiento-Carousel.css";

// Importación de imágenes locales
import imagen1 from "../assets/imag13.jpg";
import imagen2 from "../assets/imag10.jpg";
import imagen3 from "../assets/imag11.jpg";
import imagen4 from "../assets/imag12.jpg";

// Cada tarjeta tiene una imagen local y un link
const cards = [
  { image: imagen1, link: "/pagina1" },
  { image: imagen2, link: "/pagina2" },
  { image: imagen3, link: "/pagina3" },
  { image: imagen4, link: "/pagina4" },
];

export default function MovimientoCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="Movimiento-Carousel-Wrapper overflow-hidden w-full bg-white dark:bg-neutral-900 py-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="Movimiento-Carousel-Inner flex"
        animate={{ x: isPaused ? 0 : ["0%", "-100%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...cards, ...cards].map((card, idx) => (
          <MovimientoCard key={idx} image={card.image} link={card.link} />
        ))}
      </motion.div>
    </div>
  );
}

function MovimientoCard({ image, link }) {
  return (
    <motion.a
      href={link}
      whileHover={{ scale: 1.1 }}
      className="Movimiento-Card-Wrapper flex-shrink-0 w-[300px] sm:w-[280px] h-[350px] mx-4 overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-transform duration-300"
    >
      <img
        src={image}
        alt="Card"
        className="Movimiento-Card-Image w-full h-full object-cover"
      />
    </motion.a>
  );
}
