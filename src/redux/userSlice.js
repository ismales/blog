import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  token: null,
  username: null,
  email: null,
  image: "https://static.productionready.io/images/smiley-cyrus.jpg",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { token, username, email, image } = action.payload;
      state.token = token;
      state.username = username;
      state.email = email;
      state.image = image !== undefined ? image : state.image;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logOut: (state) => {
      state.token = null;
      state.username = null;
      state.email = null;
      state.image = "https://static.productionready.io/images/smiley-cyrus.jpg";
      localStorage.removeItem("user");
    },
    editProfile: (state, action) => {
      const { username, email, image } = action.payload;
      if (username !== undefined) state.username = username;
      if (email !== undefined) state.email = email;
      if (image !== undefined) state.image = image;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { signIn, logOut, editProfile } = userSlice.actions;

export default userSlice.reducer;
