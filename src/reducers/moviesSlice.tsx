import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "../types/index";

import { _transformData, getGenres } from "../utils/utils";

const initialState: TState = {
  movies: [],
  currentPage: 1,
  pagesCount: 0,
  moviesLoadingStatus: "idle",
  genres: [],
};

const _url = "https://api.kinopoisk.dev/v1.4/movie?limit=50";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page, rating, genresString }: { page: number; rating: number[]; genresString: string }) => {
    let url = `${_url}&page=${page}&rating.kp=${rating[0]}-${rating[1]}${genresString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": "GFM0NJH-T1ZM5VD-KVEV5VC-JX2QR9E",
      },
    });
    const data = await response.json();
    console.log(data);

    const transformedData = data.docs.map(_transformData);
    const genres = getGenres(transformedData);

    return [transformedData, data.pages, genres];
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.moviesLoadingStatus = "loading";
        state.movies = [];
        state.pagesCount = 0;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesLoadingStatus = "idle";
        state.movies = action.payload[0];
        state.pagesCount = action.payload[1];
        state.genres = [...action.payload[2]];
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.moviesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = moviesSlice;
export const { setCurrentPage } = actions;

export default reducer;
