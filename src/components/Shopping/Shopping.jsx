import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingApi } from "../../state/ShoppingStore";
import Card from "../Home/Body_Home/Card";
const Swal = require("sweetalert2");

let arrClon = []; // arreglo clon del estado "products"
let precioContext = 0; // controlador del precio total del carrito
let controller = false; // controlador de ejecucion del useEffect que ejecuta una peticion a la api

const Shopping = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]); // Estado incial del componente shopping
  const [contadorProductos, setcontadorProductos] = useState(0); // Cantidad de productos en el carrito
  const [precioFinal, setprecioFinal] = useState(0); // Precio total del carrito
  const {email, id} = useSelector((state) => state.user);


  const montoTotal = (array) => {
    // Actualiza el monto total del carrito
    console.log(array)
    array.map((product) => {
      const { quantity } = product,
          price = product.model.price;
        let precioSuma = (precioContext += price * quantity);
        setprecioFinal(precioSuma);
    });
  };


  const eliminarProducto = (el, cantidad) => {
    // Elimina un producto del carrito


    let cantidadProduct = cantidad || 1,
      precio = el.model.price,
      precioTotal = precioFinal,
      precioResultado = cantidadProduct * precio; // Multiplica por la cantidad de productos para generar un precio total
    precioTotal -= precioResultado; // resta el precio total del proucto eliminado del precio total del carrito

    axios.delete(`api/cart/delete/${id}/${el.id}`)
    .then(res => console.log(res.data))

    let newData = products.filter((el) => {
      // filtra el arr del carrito y lo devuelve sin el producto a eliminar
      setcontadorProductos(contadorProductos - 1); // resta en 1 la cantidad de productos del carrito
      return el.id !== id;
    });

    const si = arrClon.filter((el) => {
      // elimina el elemento  del Arreglo Pricipal Clon "arrClon"
      return el.disenio !== id;
    });

    arrClon = si; // devuelve el dato filtrado y lo setea en arrClon

    setprecioFinal(precioTotal); // Actualiza el precio total
    setProducts(newData);
  };

  const eliminarUnidad = (el) => {
    // Elimina una unidad de un producto del carrito
    let precioCarrito = precioFinal;
    let precioProducto = (precioCarrito -= el.model.price);
    setprecioFinal(precioProducto); // devuelve el precioFinal con el valor de la unidad restada
  };

  const añadirUnidad = (el) => {
    // Agrega una unidad de un producto del carrito
    let precioCarrito = precioFinal;
    let precioProducto = (precioCarrito += el.model.price);
    setprecioFinal(precioProducto); // devuelve el precioFinal con el valor de la unidad añadida
  };

  const buyCart = () => {
    axios(`api/sendMail/mailer/${id}`).then((result) => {
      Swal.fire({
        title: result.data,
        imageUrl:
          "https://icons.iconarchive.com/icons/google/noto-emoji-activities/256/52707-party-popper-icon.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Party image",
        width: 600,
        showCloseButton: true,
        showConfirmButton: false,
        color: "black",
        backdrop: ` rgba(0,0,123,0.4) `,
        html: `You will be receiving a confirmation email whith order details in <a href="//${email}"><b>${email}"</b></a> `,
      });
    });
  };

  useEffect(() => {
    axios.get(`/api/cart/${id}`).then((product) => {
      console.log(product)
      setProducts(product.data.item); // actualiza el estado de products con la respuesta a la api
      setcontadorProductos(product.data.item.length);
      if (!controller) {
        // controller evita que se duplique el monto total del carrito haciendo 2 peticiones api
        controller = true;
        return montoTotal(product.data.item);
      }
    });
  },[]);


  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="flex justify-between items-center px-12"
        style={{ width: "90%", margin: "0 auto" }}
      >
        <h1>{`cantidad de productos: ${contadorProductos}`}</h1>
        <h1>{`Monto total: ${precioFinal}`}</h1>
      </div>
      <div className="Container-Grid-Body-F">
        {products.length > 0 ? (
          products.map((el, index) => (
            <Card
              el={el}
              state={products.state}
              key={index}
              eliminarUnidad={eliminarUnidad}
              añadirUnidad={añadirUnidad}
              eliminarProducto={eliminarProducto}
            />
          ))
        ) : (
          <h1>Spinner</h1>
        )}
      </div>
      <div className="flex justify-center align-center">
        <button
          href="#"
          className="rounded-md bg-fuchsia-500 px-3.5 py-2.5 w-72 text-sm font-semibold text-white  shadow-sm hover:bg-fuchsia-700 "
          onClick={buyCart}
        >
          BUY CART
        </button>
      </div>
    </div>
  );
};

export default Shopping;
