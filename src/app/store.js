import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/games/gamesSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import genresReducer from "../features/genres/genreSlice";

/**
 * Configure the Redux store.
 * Uses Redux Toolkit's configureStore
 */
export const store = configureStore({
  reducer: {
    games: gamesReducer,
    favorites: favoritesReducer,
    genres: genresReducer,
  },
});
