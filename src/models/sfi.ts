/* eslint-disable @typescript-eslint/no-explicit-any */
// import User from "./user_createdby";

export interface SfiModel {
  
  id: string;

  unique_number: string;

  is_active?: boolean | undefined;

  sfitrail_set?: any[] | undefined;

  updated_at?: Date | string | undefined;

//   created_by?: User | object | undefined;

  created_at?: Date | string | undefined;
}