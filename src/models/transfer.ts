import { APIResponseList } from "./apiResponseList";
import { IncidentModel } from "./incident";
import { CreatedByUserModel } from "./user";

export interface TransferModel {
  id: string;
  status: string;
  incident: IncidentModel | string | undefined;
  updated_at: string;
  created_by: CreatedByUserModel | string;
  created_at:  string;
}

export interface TransferListModel extends APIResponseList {
    results : TransferModel[]
}