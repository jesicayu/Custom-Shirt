import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import usersReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: usersReducer,
  },
});

export default store;
