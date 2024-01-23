import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import { setMessage } from "../slices/message";
import { CustomError } from "../../utils/api";
import { AxiosError } from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (requestData: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await AuthService.login(
        requestData.email,
        requestData.password
      );
      return { user: data.user, tokens: data.tokens };
    } catch (err) {
      const error = err as AxiosError<CustomError>;
      console.log(error)
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response?.status == 401) {
        message = "No account found with the given email and password!";
      }
      if (error.response?.status == 404) {
        message = "Something Went Wrong! Page Not found!";
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const verifyUserOtp = createAsyncThunk(
//   "auth/verify-otp",
//   async (requestData: { data: object, headers: object }, thunkAPI) => {
//     try {
//       const data = await AuthService.verifyOtp(
//         requestData.data,
//         requestData.headers
//       );
//       return { user: data.user, tokens: data.tokens };
//     } catch (err) {
//       const error = err as AxiosError<CustomError>;
//       console.log(error)
//       let message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       if (error.response?.status == 401) {
//         message = "No account found with the given email and password!";
//       }
//       if (error.response?.status == 404) {
//         message = "Something Went Wrong! Page Not found!";
//       }
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (err) {
      const error = err as AxiosError<CustomError>;
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (error.response?.status == 404) {
        message = "Something Went Wrong! Page Not found!";
      }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
