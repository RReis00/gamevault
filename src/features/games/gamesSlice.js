import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ mode = "popular", query = "", genre = "", page = 1 }, thunkAPI) => {
    let url = `${BASE_URL}?key=${API_KEY}&page=${page}&page_size=18`;

    if (mode === "search" && query) {
      url += `&search=${query}`;
    } else if (mode === "genre" && genre) {
      url += `&genres=${genre}`;
    }

    const response = await axios.get(url);
    return { results: response.data.results, mode, query, genre, page };
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
    list: [],
    status: "idle",
    error: null,
    selectedGame: null,
    detailStatus: "idle",

    page: 1,
    hasMore: true,

    mode: "popular",
    query: "",
    genre: "",
  },
  reducers: {
    resetGamesState: (state) => {
      state.list = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle;";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        const { results, mode, query, genre, page } = action.payload;

        state.status = "succeeded";
        state.mode = mode;
        state.query = query;
        state.genre = genre;
        state.page = page;

        if (page === 1) {
          state.list = results;
        } else {
          state.list = [...state.list, ...results];
        }

        state.hasMore = results.length === 18;
      })
      .addCase(fetchGames.rejected, (state, action) => {
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

export const { resetGamesState } = gamesSlice.actions;

export default gamesSlice.reducer;
