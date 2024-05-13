
import React, { useState } from "react";

function PlantCard({ plant }) {
  const [isSoldOut, setIsSoldOut] = useState(false); 

  const handleToggleSoldOut = async () => {
    try {
      const response = await fetch(`http://localhost:6001/plants/${plant.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ soldOut: !isSoldOut })
      });
      if (!response.ok) {
        throw new Error("Failed to mark plant as sold out");
      }
      setIsSoldOut(!isSoldOut); 
    } catch (error) {
      console.error("Error marking plant as sold out:", error);
    }
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button className={isSoldOut ? "primary" : ""} onClick={handleToggleSoldOut}>
        {isSoldOut ? "Sold Out" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
