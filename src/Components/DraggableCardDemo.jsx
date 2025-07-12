import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../Components/DraggableCardContainer";
import "../Style/DraggableCard.css";

// Imágenes locales
import tylerImg from "../assets/adidas.png";
import narratorImg from "../assets/nike.png";
import icelandImg from "../assets/puma.png";
import japanImg from "../assets/umbro.png";

const items = [
  { title: "Tyler Durden", image: tylerImg, className: "card1" },
  { title: "The Narrator", image: narratorImg, className: "card2" },
  { title: "Iceland", image: icelandImg, className: "card3" },
  { title: "Japan", image: japanImg, className: "card4" },
];

const rotationValues = [-50, -30, -20, 20];
const translateYValues = [40, 30, 20, 10];
const translateXValues = [-20, -10, 10, 20];
const zIndexValues = [1, 2, 3, 4];

export default function DraggableCardDemo() {
  return (
    <DraggableCardContainer className="min-h-screen w-full flex items-center justify-center p-4">
      {items.map((item, idx) => (
        <DraggableCardBody
          key={idx}
          className={item.className}
          style={{
            rotate: `${rotationValues[idx]}deg`,
            y: translateYValues[idx],
            x: translateXValues[idx],
            position: "absolute",
            zIndex: zIndexValues[idx],
            cursor: "grab",
          }}
        >
          <img src={item.image} alt={item.title} className="card-image" />
          <h3 className="card-title">{item.title}</h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
