// src/Pages/CarouselHomepage.jsx
import React from 'react';
import '../Style/CarouselHomepage.css';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const CarouselHomepage = () => {
  return (
    <div id="carouselHomepage" className="carousel-Homepage carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner-Homepage carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="carousel-image-Homepage d-block w-100" alt="Imagen 1" />
        </div>
        <div className="carousel-item">
          <img src={img2} className="carousel-image-Homepage d-block w-100" alt="Imagen 2" />
        </div>
        <div className="carousel-item">
          <img src={img3} className="carousel-image-Homepage d-block w-100" alt="Imagen 3" />
        </div>
        <div className="carousel-item">
          <img src={img4} className="carousel-image-Homepage d-block w-100" alt="Imagen 4" />
        </div>
        <div className="carousel-item">
          <img src={img5} className="carousel-image-Homepage d-block w-100" alt="Imagen 5" />
        </div>
      </div>
      <button
        className="carousel-button-Homepage carousel-control-prev"
        type="button"
        data-bs-target="#carouselHomepage"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-button-Homepage carousel-control-next"
        type="button"
        data-bs-target="#carouselHomepage"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default CarouselHomepage;
