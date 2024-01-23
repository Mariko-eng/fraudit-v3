import { API } from "../utils/api";

const getUsers = (params: object, headers: object) => {

  // Convert params object to a query string
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return API.get(`/api/users/list/?${queryString}`, { headers: headers }).then((response) => {
    return response.data;
  });
};


const UserService = {
  getUsers,
}

export default UserService;