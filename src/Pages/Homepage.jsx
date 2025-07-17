import React from "react";
import CarouselHomepage from "../Components/CarouselHomepage";
import CuadriculaImagenes from "../Components/CuadriculaImagenes";
import { BackgroundBeamsWithCollision } from "../Components/ui/background-beams-with-collision";
import MovimientoCarousel from "../Components/Movimiento-Carousel";
import NuevosProductos from "../Components/Homepage/NuevosProductos";
import '../Style/HomePage.css';
import { div } from "framer-motion/client";

const HomePage = () => {
  return (
    <>
      <div className="conteiner">
        <div className="conteiner-homepage">
          <BackgroundBeamsWithCollision>
            <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
              CORRE CON{" "}
              <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-blue-500 via-red-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                  <span>NOSOTROS</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-500 via-red-500 to-pink-500 py-4">
                  <span>NOSOTROS</span>
                </div>
              </div>
            </h2>
          </BackgroundBeamsWithCollision>
          <div className="mt-2">
            <CarouselHomepage />
          </div>
          <div className="mt-4">
            <CuadriculaImagenes />
          </div>
          <div className="mt-4">
            <div className="mx-4">
              <h3>Nuestros Clásicos</h3>
            </div>
            <div>
              <MovimientoCarousel />
            </div>
          </div>
          <div className="mt-4">
            <div className="mx-4">
              <h3>Nuevos Productos</h3>
            </div>
            <div>
              <NuevosProductos />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

