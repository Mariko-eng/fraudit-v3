import { APIResponseList } from "./apiResponseList";
import { SfiModel } from "./sfi";
import { CreatedByUserModel } from "./user";

export interface IncidentFileModel {
  id: string;
  description: string | undefined;
  file: string | undefined;
  updated_at: Date | string | undefined;
  created_by: CreatedByUserModel | string | undefined;
  created_at: Date | string | undefined;
}

export interface IncidentInvolvedIndividualModel {
  id: string;
  individual_name: string | number | undefined;
  involved_sfi_name: string | number | undefined;
  individual_id_type: string | number | undefined;
  individual_id_details: string | number | undefined;
  updated_at: Date | string | undefined;
  created_by: CreatedByUserModel | string | undefined;
  created_at: Date | string | undefined;
}

export interface IncidentModel {
  id: string;
  category: string;
  category_name: string;
  sub_category: string;
  sub_category_name: string;
  currency: string | "UGX";
  classification: string;
  description: string;
  actual_amount:  number;
  suspected_amount: number;
  actual_date: string;
  discovered_date: string | undefined;
  police_reference_no: string | number | undefined;
  actions_taken: string | number | undefined;
  lessons_taken: string | number | undefined;
  status: string | undefined;
  is_active: boolean | false;
  sfi: SfiModel | undefined;
  incidentfile_set: IncidentFileModel[] | [];
  incidentinvolvedindividual_set: IncidentInvolvedIndividualModel[] | [];
  transferrequest_set: object[] | [];
  updated_at: string | undefined;
  created_by: CreatedByUserModel | string | undefined;
  created_at:  string | undefined;
}

export interface IncidentListModel extends APIResponseList {
    results : IncidentModel[]
}