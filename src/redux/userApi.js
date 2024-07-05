import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api/",
    prepareHeaders: (headers) => {
      let token = null;
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      }
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      headers.set("Content-type", "application/json; charset=UTF-8");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),
    sigIn: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useSigInMutation, useEditProfileMutation } = userApi;
