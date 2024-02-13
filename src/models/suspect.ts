import { APIResponseList } from "./apiResponseList";

export interface IncidentSuspectModel {
  id: string;
  incident: string,
  individual_name: string;
  individual_email: string;
  individual_phone: string;
  individual_id_type: string;
  individual_id_details: string;
  updated_at: string;
  created_at:string;
//   created_by?: string | undefined;
}

export interface IncidentSuspectListModel extends APIResponseList {
    results : IncidentSuspectModel[]
}