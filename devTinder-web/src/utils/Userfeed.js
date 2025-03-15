import { createSlice } from "@reduxjs/toolkit";

const UserFeed = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const userFeed = state.filter((user) => user._id !== action.payload);
      return userFeed;
    },

    clearFeed: (state, action) => {
      return [];
    },
  },
});

export const { addFeed, removeFeed, clearFeed } = UserFeed.actions;
export default UserFeed.reducer;
