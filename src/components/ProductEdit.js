import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const ProductEdit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/admin/${id}`)
      .then((res) => res.data)
      .then((product) => setData(product));
  }, []);
  const keys = Object.keys(data);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/admin/${id}`, { ...data })
      .then((res) => res.data)
      .then((product) => {
        alert(`Changed values of Shirt with id: ${id}`);
      })
      .then(() => navigate("/products"))
      .catch(() =>
        alert("Se ha producido un error al actualizar el producto.")
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {keys.map((key) => (
          <div className="mb-6" key={key}>
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {key}
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name={key}
              value={data[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
      <button
        className="rounded-md bg-slate-500 px-3.5 py-2.5 mb-5 text-sm font-semibold text-white  shadow-sm hover:bg-slate-700 "
        onClick={handleSubmit}
      >
        Update Product
      </button>
    </>
  );
};

export default ProductEdit;
