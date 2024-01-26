import { API } from "../utils/api";


const getIncidents = (params: object, headers: object) => {

  // Convert params object to a query string
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return API.get(`/api/incident/list/?${queryString}`, { headers: headers }).then((response) => {
    return response.data;
  });
};

const getIncidentById = (id: string, headers: object) => {

  return API.get(`/api/incident/retrieve/${id}`, { headers: headers }).then((response) => {
    return response.data;
  });
};

const addIncident = (data: object, headers: object) => {

  return API.post('/api/incident/add/', data ,{ headers: headers }).then((response) => {
    return response;
  });
};


const addFilesToIncident = (data: FormData, token: string) => {
  return API.post('/api/incident/file/add/', data, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    return response;
  });
};

const IncidentService = {
  getIncidents,
  getIncidentById,
  addIncident,

  addFilesToIncident,
}

export default IncidentService;