import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  logIn: {
    email: "",
    password: "",
  },
  contacts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setLogIn: (state, action) => {
      state.logIn = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setLogOut: (state) => {
      state.logIn = initialState;
      state.account = initialState;
    },
  },
});

export const { setAccount, setLogIn, setContacts, setLogOut } =
  authSlice.actions;
export default authSlice.reducer;
