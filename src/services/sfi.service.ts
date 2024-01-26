import { API } from "../utils/api";


const getSfis = (headers: object) => {

  return API.get(`/api/sfi-entity/list/`, { headers: headers }).then((response) => {
    return response.data;
  });
};

const SfiService = {
  getSfis,
}

export default SfiService;