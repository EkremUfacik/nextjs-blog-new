import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    expDate: null,
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.expDate = payload.expDate;
      state.userId = payload.userId;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    logout: (state) => {
      state.expDate = null;
      state.userId = null;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFail, logout } =
  authSlice.actions;

export default authSlice.reducer;
