import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSearch: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleSearch } = searchSlice.actions;

const { reducer } = searchSlice;
export default reducer;
