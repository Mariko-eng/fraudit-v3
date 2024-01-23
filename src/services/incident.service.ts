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
  console.log(id)

  return API.get(`/api/incident/retrieve/${id}`, { headers: headers }).then((response) => {
    return response.data;
  });
};

const IncidentService = {
  getIncidents,
  getIncidentById,
}

export default IncidentService;