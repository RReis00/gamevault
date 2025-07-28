import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export const fetchPopularGames = createAsyncThunk(
  "games/fetchPopularGames",
  async () => {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&page_size=18`);
    return response.data.results;
  }
);

export const searchGames = createAsyncThunk(
  "games/searchGames",
  async (term) => {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&search=${term}&page_size=18`
    );
    return response.data.results;
  }
);

export const fetchGamesByGenre = createAsyncThunk(
  "games/fetchGamesByGenre",
  async (genreSlug) => {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&genres=${genreSlug}&page_size=18`
    );
    return response.data.results;
  }
);

export const fetchGameDetails = createAsyncThunk(
  "games/fetchGameDetails",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}?key=${API_KEY}`);
    return response.data;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    popular: [],
    status: "idle",
    error: null,
    selectedGame: null,
    detailStatus: "idle",
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

    builder
      .addCase(searchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popular = action.payload;
      })
      .addCase(searchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchGamesByGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGamesByGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popular = action.payload;
      })
      .addCase(fetchGamesByGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.detailStatus = "loading";
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedGame = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default gamesSlice.reducer;
