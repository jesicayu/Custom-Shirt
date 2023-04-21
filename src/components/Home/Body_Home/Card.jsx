import React, { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ el, eliminarUnidad, añadirUnidad, eliminarProducto }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (el.quantity > 1) setQuantity(el.quantity);
    return () => {};
  }, [el]);

  const agregar = (product) => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
      añadirUnidad(product);
    }
  };

  const disminuir = (product) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      eliminarUnidad(product);
    }
  };

  const eliminarProductF = () => {
    eliminarProducto(el, quantity);
  };

  return (
    <>
      <div
        id="Card-Grid"
        className="max-w-sm rounded overflow-hidden shadow-lg"
      >
        <img className="w-full" src={el.image ? el.image : el.model.image} alt="Sunset in the mountains" />

        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {el.style ? el.style : el.model.style}
          </span>
          <span className="inline-block bg-gray-200 rounded px-3 py-3 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
          {el.description ? el.description : el.model.size}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            $ {el.minPrice ? `${el.minPrice} - ${el.maxPrice}` : el.model.price }
          </span>
        </div>
        {eliminarProducto && eliminarUnidad && añadirUnidad && (
          <div
            className="flex justify-between items-center px-6 pt-4 pb-12"
            style={{ width: "80%" }}
          >
            <button
              onClick={() => disminuir(el)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => agregar(el)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              +
            </button>
            <button
              onClick={() => eliminarProductF()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Elminar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
