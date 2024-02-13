import { APIResponseList } from "./apiResponseList";
import { SfiModel } from "./sfi";

export interface CreatedByUserModel {
  id: string;

  email: string;

  is_active: boolean;

  national_id: string;

  phone_number: string ;

  sfi: SfiModel | string;

  user_category: string;

  user_type: string | undefined;
}

export interface UserModel {
	id: string  | undefined;
	user_category: string | number | undefined;
	sfi: SfiModel | string | undefined;
	first_name: string | undefined;
	last_name: string | undefined;
	email: string | undefined;
	phone_number: string | undefined;
	is_superuser: boolean;
	is_active: boolean;
	is_staff: boolean;
	groups: string[]  | undefined;
	user_permissions: object[] | string[] | undefined;
	usertrail_set: object[] | string[] | undefined;
	// national_id: string | undefined;
	// gender: string | undefined;
	// two_factor_enabled: boolean | undefined;
	// last_otp_verified: Date | string | undefined;
	// otp_secret: string | undefined;
	// otp_code: string | undefined;
	// password: string | undefined;
	is_otp_verified: boolean;
	last_login: string;
	created_at: string;
	created_by: object | string | undefined;
	updated_at: string;
}

export interface UserListModel extends APIResponseList {
    results : UserModel[]
}
