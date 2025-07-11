import React from "react";
import { DraggableCardBody, DraggableCardContainer } from "../Components/DraggableCardContainer";
import "../Style/DraggableCard.css";

const items = [
  { title: "Tyler Durden", image: "https://images.unsplash.com/photo-1732310216648-603c0255c000", className: "card1" },
  { title: "The Narrator", image: "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b", className: "card2" },
  { title: "Iceland", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b", className: "card3" },
  { title: "Japan", image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f", className: "card4" },
];

const rotationValues = [-50, -30, -20, 0];
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

