import { UserModel } from "../models/user";
import { APIAUTH } from "../utils/api";

const login = (email: string, password: string) => {
  return APIAUTH.post("/api/users/token/login/", {
    email,
    password,
  }).then((response) => {

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
  return APIAUTH.post("/api/users/otp/send_email/", data, { headers: headers }).then((response) => {
    return response.data;
  });
};

const verifyOtp = (data: object, headers: object) => {
  return APIAUTH.post("/api/users/otp/verify/", data, { headers: headers }).then((response) => {
        const user = localStorage.getItem("user");
    if (user){
      const obj = JSON.parse(user) as UserModel;
      obj.is_otp_verified = true
      localStorage.setItem("user", JSON.stringify(obj));
    }
    return response.data;
  });
};

const getUserByEmail = async(
	email: string,
) => {
	return await APIAUTH.get(`/users/?search=${email}`).then((response) => response.data);
}

const resetPasswordRequest = async(
	email: string,
	password: string,
) => {
	return await APIAUTH.post(
		"/api/users/reset-password/",
		{ user: { email, password } },
	);
}

const forgotPasswordRequest = async(
	email: string | undefined,
) => {
	return await APIAUTH.post(
		"/api/users/forgot-password/",
		{ user: { email: email, frontend_url: `${window.location.href.split("/forgot-password")[0]}/reset-password` } },
	);
}



const logout = () => {
  localStorage.clear()
  // localStorage.removeItem("user");
  // return API.post("/api/users/token/blacklist/").then((response) => {
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

const AuthService = {
  login,
  requestOtp,
  verifyOtp,
  logout,
  getCurrentUser,

  getUserByEmail,
  resetPasswordRequest,
  forgotPasswordRequest
};

export default AuthService;
