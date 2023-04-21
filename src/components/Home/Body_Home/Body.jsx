import React, { useState, useEffect } from "react";
import axios from "axios";
import { FakeData } from "./FakeData";
import Card from "./Card";
import { Link } from "react-router-dom";
import "./Body.css";

const Body = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/products/styles").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <div className="py-10 px-10 m-10">
        <h1 className="text-8xl font-bold text-violet-900">
          Bienvenido a Custom T Shirt
        </h1>
        <h3 className="text-slate-700 font-bold text-4xl mt-10 leading-normal">
          El lugar donde podes diseñar tu{" "}
          <span className="underline">remera ideal.</span> Es simple. Elegi tu
          modelo. Elegi tu color y talle. Subi tu diseño favorito. Nosotros nos
          encargamos del resto.
        </h3>
        <div>
        
        </div>
      </div>
      <div className="Container-Grid-Body-F">
        {data.length > 0 ? (
          data.map((product, i) => (
            <Link key={i} to={`/product/${product.style}`}>
              <Card key={i} el={product} />
            </Link>
          ))
        ) : (
          <h1>Spinner</h1>
        )}
      </div>
    </>
  );
};

export default Body;
