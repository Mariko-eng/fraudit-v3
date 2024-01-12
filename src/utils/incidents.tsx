import { incidents } from "../constants/sample_data/incident_data";

export const getIncidents = async () => {
  if (incidents.length > 2) {
    return Promise.resolve(incidents);
  } else {
    return Promise.reject("Error");
  }
};

export const posIncident = async (data: {
  id: string;
  category: string;
  sub_category: string;
  description: string;
}) => {
  console.log(data);
  try {
    incidents.push(data);
    return Promise.resolve(incidents);
  } catch (err) {
    return Promise.reject("Error");
  }
};
