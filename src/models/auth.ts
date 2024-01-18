import { SfiModel } from "./sfi";

export interface AuthTokenModel {
    access: string,
    refreesh: string
}

export interface AuthUserModel {
	created_at: Date | string | undefined;
	created_by: object | string | number | undefined;
	date_joined: Date | string | undefined;
	email: string | undefined;
	first_name: string | undefined;
	gender: string | undefined;
	groups: string[]  | undefined;
	id: string  | undefined;
	is_active: boolean | undefined;
	is_otp_verified: boolean | undefined;
	is_staff: boolean | undefined;
	is_superuser: boolean | undefined;
	last_login: Date | string | undefined;
	last_name: string | undefined;
	last_otp_verified: Date | string | undefined;
	national_id: string | undefined;
	otp_code: string | undefined;
	otp_secret: string | undefined;
	password: string | undefined;
	phone_number: string | undefined;
	sfi: SfiModel | string | undefined;
	two_factor_enabled: boolean | undefined;
	updated_at: Date | string | undefined;
	user_category: string | number | undefined;
	user_permissions: object[] | string[] | undefined;
	usertrail_set: object[] | string[] | undefined;
}