import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const Users = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user")
      .then((res) => res.data)
      .then((list) => setData(list));
  }, []);
  const handleClick = (e) => {
    const body = {
      first_name:
        e.target.parentNode.parentNode.parentNode.getElementsByTagName("th")[0]
          .textContent,
      last_name:
        e.target.parentNode.parentNode.parentNode.getElementsByTagName("td")[0]
          .textContent,
      email:
        e.target.parentNode.parentNode.parentNode.getElementsByTagName("td")[1]
          .textContent,
      is_admin: e.target.checked,
    };
    axios
      .put("http://localhost:3001/api/user", body)
      .then((res) => res.data)
      .then(() => {
        body.is_admin
          ? alert(`Set user ${body.first_name} to admin`)
          : alert(`${body.first_name} is no longer an admin`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (e) => {
    const first_name =
      e.target.parentNode.parentNode.parentNode.getElementsByTagName("th")[0]
        .textContent;
    const email =
      e.target.parentNode.parentNode.parentNode.getElementsByTagName("td")[1]
        .textContent;
    axios
      .delete("http://localhost:3001/api/user", {
        headers: {
          email: email,
        },
      })
      .then((res) => res.data)
      .then(() => {
        alert(`User ${first_name} has been deleted from Database`);
        window.location.assign("http://localhost:3000/users");
      })
      .catch((error) => console.log(error));
  };
  if (!user.is_admin) return <h1>Unauthorized</h1>;
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" class="sr-only">
          Search
        </label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              First Name
            </th>
            <th scope="col" class="px-6 py-3">
              Last Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Admin
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((each) => {
            return (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {each.first_name}
                </th>
                <td class="px-6 py-4">{each.last_name}</td>
                <td class="px-6 py-4">{each.email}</td>
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    {each.is_admin ? (
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={handleClick}
                        checked="checked"
                      />
                    ) : (
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={handleClick}
                      />
                    )}

                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <img
                      onClick={handleDelete}
                      src="https://cdn-icons-png.flaticon.com/128/542/542724.png"
                      alt="trash-bin"
                      style={{ cursor: "pointer", maxWidth: "15px" }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
