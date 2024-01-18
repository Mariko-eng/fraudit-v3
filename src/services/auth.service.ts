import { API } from "../utils/api";

const login = (email: string, password: string) => {
  return API.post("users/token/login/", {
    email,
    password,
  }).then((response) => {
    console.log(response.data);

    if (response.data.tokens) {
      localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
    }

    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  });
};

const requestOtp = (data: object, headers: object) => {

  return API.post("users/otp/send_email/", data, { headers: headers }).then((response) => {
    return response.data;
  });
};

const verifyOtp = (data: object, headers: object) => {
  return API.post("users/otp/verify/", data, { headers: headers }).then((response) => {
    return response.data;
  });
};

const logout = () => {
  localStorage.clear()
  // localStorage.removeItem("user");
  // return API.post("users/token/blacklist/").then((response) => {
  //   return response.data;
  // });
};

const getCurrentUser = () => {
  const userString = localStorage.getItem("user");

  if (userString === null) {
    return null; // or handle the case where "user" is not in localStorage
  }

  return JSON.parse(userString);
};

const register = (username: string, email: string, password: string) => {
  return API.post("signup", {
    username,
    email,
    password,
  });
};

const AuthService = {
  login,
  requestOtp,
  verifyOtp,
  logout,
  register,
  getCurrentUser,
};

export default AuthService;
