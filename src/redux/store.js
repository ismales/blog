import { configureStore } from "@reduxjs/toolkit";
import { articlesApi } from "./articlesApi";

export default configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});
