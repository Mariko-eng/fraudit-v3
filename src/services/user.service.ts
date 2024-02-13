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

const getUserById = (userId: string, headers: object) => {

  return API.get(`/api/users/retrieve/${userId}`, { headers: headers }).then((response) => {
    return response.data;
  });
};


const registerUser = (data: object, headers: object) => {

  return API.post('/api/users/register/', data ,{ headers: headers }).then((response) => {
    return response;
  });
};

const registerSuperUser = (data: object, headers: object) => {

  return API.post('/api/users/super/register/', data ,{ headers: headers }).then((response) => {
    return response;
  });
};

const updateUser = (userId: string, data: object, headers: object) => {

  return API.put(`/api/users/edit/${userId}/`, data ,{ headers: headers }).then((response) => {
    return response;
  });
};

const updateSuperUser = (userId: string, data: object, headers: object) => {

  return API.put(`/api/users/super/edit/${userId}/`, data ,{ headers: headers }).then((response) => {
    return response;
  });
};

const activateUser = (userId: string, headers: object) => {

  return API.put(`/api/users/activate/${userId}/`, {} ,{ headers: headers }).then((response) => {
    return response;
  });
};

const deactivateUser = (userId: string, headers: object) => {

  return API.put(`/api/users/de-activate/${userId}/`, {} ,{ headers: headers }).then((response) => {
    return response;
  });
};

const deleteUser = (userId: string, headers: object) => {

  return API.delete(`/api/users/delete/${userId}/` ,{ headers: headers }).then((response) => {
    return response;
  });
};


const UserService = {
  getUsers,
  getUserById,
  registerUser,
  registerSuperUser,
  updateUser,
  updateSuperUser,
  activateUser,
  deactivateUser,
  deleteUser
}

export default UserService;