import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export const fetchPopularGames = createAsyncThunk(
  "games/fetchPopularGames",
  async () => {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&page_size=20`);
    return response.data.results;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    popular: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popular = action.payload;
      })
      .addCase(fetchPopularGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gamesSlice.reducer;
