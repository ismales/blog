import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { signIn, logOut } = tokenSlice.actions;

export default tokenSlice.reducer;
