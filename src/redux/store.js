import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { articlesApi } from "./articlesApi";
import { userApi } from "./userApi";

export default configureStore({
  reducer: {
    user: userReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware, userApi.middleware),
});
