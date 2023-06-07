import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    name: "",
    isAuth: false,
  },
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
      state.isAuth = action.payload.isAuth;
      // state.password = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    userSearch(state, action) {
      state.name = action.payload;
    },
  },
});
