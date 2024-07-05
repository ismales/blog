import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
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
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: (offset) => ({
        url: "/articles",
        params: {
          limit: 5,
          offset,
        },
      }),
      providesTags: ["Articles"],
    }),
    getArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
    }),
    addArticle: builder.mutation({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Articles"],
    }),
    editArticle: builder.mutation({
      query: ({ body, slug }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
    likeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: ["Articles"],
    }),
    unLikeArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetArticleQuery,
  useAddArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnLikeArticleMutation,
} = articlesApi;
