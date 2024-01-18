import { API } from "../utils/api";

const getPublicContent = () => {
  return API.get("/all");
};

const getUserBoard = () => {
  return API.get("/user");
};

const getModeratorBoard = () => {
  return API.get("/mod");
};


const getAdminBoard = () => {
  return API.get("/admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}

export default UserService;