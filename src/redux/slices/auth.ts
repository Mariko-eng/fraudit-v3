import { createSlice } from "@reduxjs/toolkit";
import { loginUser ,logoutUser } from "./../reducers/auth"; // Adjust the import path
import { AuthTokenModel, AuthUserModel } from "../../models/auth";

const getUser = (): AuthUserModel | null => {
  const userString = localStorage.getItem("user");

  if (userString === null) {
    return null; // or handle the case where "user" is not in localStorage
  } else {
    return JSON.parse(userString) as AuthUserModel;
  }
};

const getTokens = (): AuthTokenModel | null => {
  const tokenString = localStorage.getItem("tokens");

  if (tokenString === null) {
    return null; // or handle the case where "user" is not in localStorage
  } else {
    return JSON.parse(tokenString) as AuthTokenModel;
  }
};

export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  tokens: AuthTokenModel | null;
  user: AuthUserModel | null;
}

const initialState: AuthState =
  getUser() && getTokens()
    ? {
        isLoading: false,
        isLoggedIn: true,
        tokens: getTokens(),
        user: getUser(),
      }
    : {
        isLoading: false,
        isLoggedIn: false,
        tokens: null,
        user: null,
      };

// const initialState : AuthState = getUser()
//   ? { isLoading: false, isLoggedIn: true, user : user() }
//   : { isLoading: false, isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.tokens = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.tokens = action.payload.tokens;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.tokens = null;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.tokens = null;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
