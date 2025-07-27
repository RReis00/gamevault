import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/genres";

export const fetchGenres = createAsyncThunk("games/fetchGenres", async () => {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}`);
  return response.data.results;
});

const genreSlice = createSlice({
  name: "genres",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default genreSlice.reducer;
