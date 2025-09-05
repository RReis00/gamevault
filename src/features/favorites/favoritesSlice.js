import { createSlice } from "@reduxjs/toolkit";

/**
 * Load favorites from localStorage.
 * If parsing fails or key is missing, returns an empty array.
 */
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading localStorage: ", error);
    return [];
  }
};

/**
 * Save favorites list to localStorage.
 * Handles JSON stringify and logs errors if saving fails.
 */
const saveToLocalStorage = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving localStorage: ", error);
  }
};

// Initial state is populated from localStorage
const initialState = {
  list: loadFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    /**
     * Add a game to favorites.
     * - Prevents duplicates by checking if game.id already exists.
     * - Persists updated list in localStorage.
     */
    addFavorite: (state, action) => {
      const exists = state.list.some((game) => game.id === action.payload.id);
      if (!exists) {
        state.list.push(action.payload);
        saveToLocalStorage(state.list);
      }
    },

    /**
     * Remove a game from favorites by its ID.
     * - Uses filter to return a new list.
     * - Persists updated list in localStorage.
     */
    removeFavorite: (state, action) => {
      state.list = state.list.filter((game) => game.id !== action.payload);
      saveToLocalStorage(state.list);
    },
  },
});

// Export actions for dispatching
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Export reducer for store configuration
export default favoritesSlice.reducer;
