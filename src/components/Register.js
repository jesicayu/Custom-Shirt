import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import logo from "../shirt.svg";

export default function Register() {
  const navigate = useNavigate();
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_admin: false,
  };
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
    axios
      .post("/api/user/register", { ...form })
      .then((res) => res.data)
      .then((user) => {
        alert(`New user ${user.first_name} ${user.last_name} created`);
      })
      //   .then(() => navigate("/"))
      .catch(() => alert("Signup Failed"));
    navigate("/login");
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register your account
            </h2>
            <div className="flex justify-center items-center gap-1 mt-2">
              <p className=" text-center text-sm text-gray-600">Or</p>
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </div>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleRegister}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first_name"
                  type="first_name"
                  autoComplete="first_name"
                  value={form.first_name}
                  pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{4,20}$"
                  title="El name no puede contener menos de 4 y mas de 20 caracteres"
                  required
                  className="relative block w-full mb-2 rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last_name"
                  type="last_name"
                  autoComplete="last_name"
                  value={form.last_name}
                  pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{5,20}$"
                  title="El name no puede contener menos de 10 y mas de 20 caracteres"
                  required
                  className="relative block w-full mb-2 rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                  required
                  className="relative block w-full mb-2 rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  pattern="(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$"
                  title="La password debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
                  className="relative block w-full mb-2 rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
