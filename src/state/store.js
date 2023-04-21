import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import ShoppingStore from "./ShoppingStore";
import usersReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: usersReducer,
    ShoppingStore:ShoppingStore
  },
});

export default store;
