import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      window.localStorage.setItem("isLoggedIn", JSON.stringify(state));
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.setItem("isLoggedIn", JSON.stringify(state));
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice;
