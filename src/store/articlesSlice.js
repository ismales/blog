import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
  const base = "https://blog.kata.academy/api";

  const articlesRes = await fetch(`${base}/articles`);
  const articlesData = await articlesRes.json();
  return articlesData;
});

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
    });
  },
});

// export const {} = articlesSlice.actions;
export default articlesSlice.reducer;
