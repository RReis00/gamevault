import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games";

/**
 * Fetch a list of games from RAWG API.
 * Supports three modes:
 * - "popular" (default) → just fetches games without extra filters
 * - "search" → applies &search=query
 * - "genre" → applies &genres=genre
 * Also supports pagination (page, page_size=18).
 */
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ mode = "popular", query = "", genre = "", page = 1 }, thunkAPI) => {
    let url = `${BASE_URL}?key=${API_KEY}&page=${page}&page_size=18`;

    // Add filters based on mode
    if (mode === "search" && query) {
      url += `&search=${query}`;
    } else if (mode === "genre" && genre) {
      url += `&genres=${genre}`;
    }

    const response = await axios.get(url);

    // Return results and context (mode/query/genre/page)
    return { results: response.data.results, mode, query, genre, page };
  }
);

/**
 * Fetch detailed info for a single game by its ID.
 */
export const fetchGameDetails = createAsyncThunk(
  "games/fetchGameDetails",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}?key=${API_KEY}`);
    return response.data;
  }
);

/**
 * Fetch trailers (RAWG calls them "movies") for a game by ID.
 */
export const fetchGameTrailers = createAsyncThunk(
  "games/fetchGameTrailers",
  async (id) => {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`
    );
    return response.data.results; // returns an array of trailers
  }
);

/**
 * Fetch screenshots for a game by ID.
 * NOTE: type is "game/fetchGameScreenshots" (singular),
 * might be better to make it "games/fetchGameScreenshots" for consistency.
 */
export const fetchGameScreenshots = createAsyncThunk(
  "game/fetchGameScreenshots", // could be "games/fetchGameScreenshots"
  async (id) => {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
    );
    return response.data.results; // returns an array of screenshots
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    // Game list & pagination
    list: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,

    // Selected game details
    selectedGame: null,
    detailStatus: "idle", // status for game details fetch

    // Infinite scroll
    page: 1,
    hasMore: true, // true while there may be more results

    // Current context for listings
    mode: "popular", // "popular" | "search" | "genre"
    query: "",
    genre: "",

    // Trailers
    trailers: [],
    trailerStatus: "idle",

    // Screenshots
    screenshots: [],
    screenshotsStatus: "idle",
  },
  reducers: {
    /**
     * Reset the game list and pagination state.
     * Useful before switching mode (popular → search, etc.)
     * or when starting a new search/genre filter.
     */
    resetGamesState: (state) => {
      state.list = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle"; // FIXED: removed the ";" inside string
    },
  },
  extraReducers: (builder) => {
    // --- Games list (fetchGames) ---
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

        // If it's the first page, replace list; otherwise append (infinite scroll)
        if (page === 1) {
          state.list = results;
        } else {
          state.list = [...state.list, ...results];
        }

        // If we got a full page (18 items), assume more results exist
        state.hasMore = results.length === 18;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // --- Game details (fetchGameDetails) ---
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

    // --- Trailers (fetchGameTrailers) ---
    builder
      .addCase(fetchGameTrailers.pending, (state) => {
        state.trailerStatus = "loading";
      })
      .addCase(fetchGameTrailers.fulfilled, (state, action) => {
        state.trailerStatus = "succeeded";
        state.trailers = action.payload;
      })
      .addCase(fetchGameTrailers.rejected, (state, action) => {
        state.trailerStatus = "failed";
        state.error = action.error.message;
      });

    // --- Screenshots (fetchGameScreenshots) ---
    builder
      .addCase(fetchGameScreenshots.pending, (state) => {
        state.screenshotsStatus = "loading";
      })
      .addCase(fetchGameScreenshots.fulfilled, (state, action) => {
        state.screenshotsStatus = "succeeded";
        state.screenshots = action.payload;
      })
      .addCase(fetchGameScreenshots.rejected, (state, action) => {
        state.screenshotsStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetGamesState } = gamesSlice.actions;
export default gamesSlice.reducer;
