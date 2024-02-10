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

const updateIncident = (incidentId: string, data: object, headers: object) => {

  return API.put(`/api/incident/edit/${incidentId}/`, data ,{ headers: headers }).then((response) => {
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

const addIncidentSuspects = (data: FormData, incidentId: string, token: string) => {
  return API.put(`/api/incident/involved-individuals/add/${incidentId}/`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    return response;
  });
};

const deleteIncident = (ID: string, headers: object) => {

  return API.delete(`/api/incident/delete/${ID}/` ,{ headers: headers }).then((response) => {
    return response;
  });
};

// Transfers 
const getTransferRequests = (params: object, headers: object) => {

  // Convert params object to a query string
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return API.get(`/api/incident/transfer/list/?${queryString}`, { headers: headers }).then((response) => {
    return response.data;
  });
};


const getTransferRequestById = (id: string, headers: object) => {

  return API.get(`/api/incident/transfer/retrieve/${id}`, { headers: headers }).then((response) => {
    return response.data;
  });
};


const addTransferRequest = (data: object, headers: object) => {
  return API.post('/api/incident/transfer/add/', data ,{ headers: headers }).then((response) => {
    return response;
  });
};

const approveTransferRequest = (ID: string, headers: object) => {

  return API.put(`/api/incident/transfer/approve/${ID}/` ,{ "status" : "APPROVED" },{ headers: headers }).then((response) => {
    return response;
  });
};

const declineTransferRequest = (ID: string, headers: object) => {

  return API.put(`/api/incident/transfer/decline/${ID}/` , {"status": "DECLINED"},{ headers: headers }).then((response) => {
    return response;
  });
};


const deleteTransferRequest = (ID: string, headers: object) => {

  return API.delete(`/api/incident/transfer/delete/${ID}/` ,{ headers: headers }).then((response) => {
    return response;
  });
};


const IncidentService = {
  getIncidents,
  getIncidentById,
  addIncident,
  updateIncident,
  deleteIncident,

  addFilesToIncident,
  addIncidentSuspects,

  getTransferRequests,
  getTransferRequestById,
  addTransferRequest,
  approveTransferRequest,
  declineTransferRequest,
  deleteTransferRequest
}

export default IncidentService;