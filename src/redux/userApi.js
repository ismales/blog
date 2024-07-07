import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || null;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      headers.set("Content-type", "application/json; charset=UTF-8");
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      providesTags: ["User"], // добавлено
    }),
    getUser: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useRegisterUserMutation, useSignInMutation, useGetUserQuery, useEditProfileMutation } = userApi;
