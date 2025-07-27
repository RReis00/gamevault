import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading localStorage: ", error);
    return [];
  }
};

const saveToLocalStorage = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving localStorage: ", error);
  }
};

const initialState = {
  list: loadFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.list.some((game) => game.id === action.payload.id);
      if (!exists) {
        state.list.push(action.payload);
        saveToLocalStorage(state.list);
      }
    },
    removeFavorite: (state, action) => {
      state.list = state.list.filter((game) => game.id !== action.payload);
      saveToLocalStorage(state.list);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
