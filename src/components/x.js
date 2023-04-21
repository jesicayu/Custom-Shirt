import React, { useEffect, useState } from "react";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [form, setform] = useState(initialState);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setform({
      ...form,
      [evt.target.name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="input-C-Usuario-Padre">
      <form className="input-C-Usuario-Contenedor" onSubmit={handleRegister}>
        <div className="cuentaCreada"></div>
        <div className="titulo-Sesion">
          <h1 className="crear-Cuenta-Home">Crear Cuenta</h1>
          <button className="btn-C-Usuario-X">x</button>
        </div>
        <section className="crear-C-Inputs">
          <div className="inputs-C-Sesion">
            <label htmlFor="name">
              <p style={{ margin: "0", color: "#495057" }}>Nombre:</p>
              <input
                placeholder="Nombre..."
                type="text"
                name="first_name"
                className="input-C-name"
                value={form.first_name}
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{5,20}$"
                title="El name no puede contener menos de 10 y mas de 20 caracteres"
                required
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              <p style={{ margin: "0", color: "#495057" }}>Email:</p>
              <input
                placeholder="Ejemplo@gmail.com"
                type="email"
                name="email"
                value={form.email}
                className="input-C-email"
                pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                required
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="inputs-C-Sesion">
            <label htmlFor="surname">
              <p style={{ margin: "0", color: "#495057" }}>Apellido:</p>
              <input
                placeholder="Apellido..."
                type="text"
                name="last_name"
                className="input-C-surname"
                value={form.last_name}
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{5,20}$"
                title="El surname no puede contener menos de 10 y mas de 20 caracteres"
                required
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              <p style={{ margin: "0", color: "#495057" }}>Contraseña:</p>
              <input
                placeholder="Contraseña..."
                type="password"
                name="password"
                className="input-C-password"
                value={form.password}
                pattern="(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$"
                title="La password debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
                required
                onChange={handleChange}
              />
            </label>
          </div>
        </section>
        <span className="span-Error-Crear-C">
          El email ingresado ya esta en uso
        </span>
        <label htmlFor="autorizar" className="inputs-C-Sesion-A">
          <input type="checkbox" name="autorizar" required />
          <p style={{ margin: "14px 5px" }}>He leido y acepto los</p>
        </label>
        <button type="submit" className="crear-Usuario">
          Ingresar
        </button>
        <div className="spinner-Login"></div>
      </form>
    </div>
  );
};
export default Register;
