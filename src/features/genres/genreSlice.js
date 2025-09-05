import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/genres";

/**
 * Async thunk to fetch all game genres from RAWG API.
 * Returns an array of genres (id, name, slug, etc.)
 */
export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}`);
  return response.data.results; // array of genres
});

const genreSlice = createSlice({
  name: "genres",
  initialState: {
    list: [], // holds the array of genres
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    // No custom reducers here — only async state management
  },
  extraReducers: (builder) => {
    builder
      // When request starts → set status to loading
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
      })
      // When request succeeds → store genre list
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      // When request fails → store error
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default genreSlice.reducer;
