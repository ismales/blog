import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import { articlesApi } from "./articlesApi";
import { userApi } from "./userApi";

export default configureStore({
  reducer: {
    token: tokenReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware, userApi.middleware),
});
