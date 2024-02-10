/* eslint-disable @typescript-eslint/no-explicit-any */
// import User from "./user_createdby";

import { APIResponseList } from "./apiResponseList";
import { CreatedByUserModel } from "./user";

export interface SfiModel {
  
  id: string;

  unique_number: string;

  is_active: boolean | false;

  sfitrail_set?: any[] | undefined;

  updated_at?:  string;

  created_by?: CreatedByUserModel | string | undefined;

  created_at: string;
}

export interface SfiListModel extends APIResponseList {
    results : SfiModel[]
}