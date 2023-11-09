import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    dologinAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
  },
});

export const { dologinAction, doGetAccountAction } = authSlice.actions;
export default authSlice.reducer;
