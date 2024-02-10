import { API } from "../utils/api";

const getSfis = (params: object, headers: object) => {
  // Convert params object to a query string
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return API.get(`/api/sfi-entity/list/?${queryString}`, { headers: headers }).then((response) => {
    return response.data;
  });
};

const getSfiById = (id: string, headers: object) => {

  return API.get(`/api/sfi-entity/retrieve/${id}`, { headers: headers }).then((response) => {
    return response.data;
  });
};


const addSfi = (data: object, headers: object) => {

  return API.post('/api/sfi-entity/add/', data ,{ headers: headers }).then((response) => {
    return response;
  });
};


const updateSfi = (id :string, data: object, headers: object) => {

  return API.put(`/api/sfi-entity/edit/${id}/`, data ,{ headers: headers }).then((response) => {
    return response;
  });
};

const deleteSfi = (id :string, headers: object) => {

  return API.delete(`/api/sfi-entity/delete/${id}/` ,{ headers: headers }).then((response) => {
    return response;
  });
};





const SfiService = {
  getSfis,
  getSfiById,
  addSfi,
  updateSfi,
  deleteSfi
}

export default SfiService;