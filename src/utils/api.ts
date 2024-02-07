import axios, { AxiosError } from "axios";
// import { jwtDecode } from "jwt-decode";
import { jwtDecode, JwtPayload } from "jwt-decode";
import AuthService from "../services/auth.service";
export interface CustomError extends AxiosError {
  errorMessage?: string;
  errorDetail?: string;
}

export const APIAUTH = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // dispatch something to your store
      //   console.log("Error", error.response.status);
      AuthService.logout();
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

API.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // console.log(config);
    const tokenString = localStorage.getItem("tokens");
    if (tokenString) {
      try {
        const tokens = JSON.parse(tokenString);

        const accessToken = tokens.access;
        const refreshToken = tokens.refresh;

        const accessTokenValid = checkIfAccessTokenIsValid(accessToken);

        if (accessTokenValid) {
          // Access token is valid, proceed with the request
          return config;
        } else {
          // Access token expired, attempt to refresh
          const refreshTokenValid = checkIfRefreshTokenIsValid(refreshToken);

          if (refreshTokenValid) {
            // Call Refresh API END POINT and update the headers with the new access token
            const newAccessToken = await getRefreshToken(refreshToken);
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return config;
          } else {
            // Logout because both access and refresh tokens are invalid
            console.log("Logout");
            // Add your logout logic here
          }
        }
      } catch (error) {
        console.error("Error parsing tokens:", error);
        // Logout due to token parsing error
        // console.log("Logout");
        // Add your logout logic here
      }
    } else {
      console.error("Tokens not Found!");
      // console.log("Logout");
      // Add your logout logic here
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const checkIfAccessTokenIsValid = (accessTkn: string) => {
  const decodedAccessToken: JwtPayload | undefined = jwtDecode(accessTkn);

  if (decodedAccessToken) {
    // console.log(decodedAccessToken);

    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Check if the token is expired
    const isTokenAccessExpired = decodedAccessToken.exp
      ? decodedAccessToken.exp < currentTimestamp
      : true;

    if (isTokenAccessExpired) {
      console.log("Access Token is expired");
      return false;
    } else {
      // console.log("Access Token is still valid");
      return true;
    }
  } else {
    return false;
  }
};

const checkIfRefreshTokenIsValid = (refreshTkn: string) => {
  const decodedRefreshToken: JwtPayload | undefined = jwtDecode(refreshTkn);

  if (decodedRefreshToken) {
    console.log(decodedRefreshToken);
    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Check if the token is expired
    const isTokenRefreshExpired = decodedRefreshToken.exp
      ? decodedRefreshToken.exp < currentTimestamp
      : true;

    if (isTokenRefreshExpired) {
      console.log("Refresh Token is expired");
      return false;
    } else {
      console.log("Refresh Token is still valid");
      return true;
    }
  }
};

const getRefreshToken = async (refreshTkn: string) => {
  // Implement your logic to refresh the access token using the refresh token
  // Make a request to your server to get a new access token using the refresh token
  // ...

  // Example using axios to refresh the token
  const response = await APIAUTH.post(
    `${import.meta.env.VITE_API_URL}/api//token/refresh/`,
    { refresh: refreshTkn }
  );

  const newAccessToken = response.data.access;

  // Update the local storage with the new access token
  const tokenString = localStorage.getItem("tokens");
  if (tokenString) {
    const tokens = JSON.parse(tokenString);
    tokens.access = newAccessToken;
    localStorage.setItem("tokens", JSON.stringify(tokens));
    return newAccessToken;
  } else {
    // Logout
    console.log("Logout");
  }
};
