import React, { useEffect, useState } from 'react';

const messages = [
  '¡6 Cuotas sin interés con todos los bancos! / Ver más promociones bancarias',
  'Envío gratis a partir de $229.999 / Ver términos y condiciones',
  'Pedí hoy, ¡Te llega mañana! / Exclusivo CABA y GBA',
];

const CarouselSuperior = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-black py-3 text-center mt-24 z-40 shadow-md">
      <p className="text-black dark:text-white text-base md:text-lg font-semibold font-sans tracking-tight whitespace-pre-line">
        {messages[index].split('/').map((line, i) => (
          <span key={i} className="block">
            {line.trim()}
          </span>
        ))}
      </p>
    </div>
  );
};

export default CarouselSuperior;
