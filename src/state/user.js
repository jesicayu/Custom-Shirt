import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  is_admin: false,
};

const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  });
});

export default usersReducer;
