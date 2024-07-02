import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: (offset) => ({
        url: "/articles",
        params: {
          limit: 5,
          offset,
        },
      }),
    }),
    getArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
    }),
  }),
});

export const { useGetAllArticlesQuery, useGetArticleQuery } = articlesApi;
