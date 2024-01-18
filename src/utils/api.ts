import axios, { AxiosError } from "axios";

export interface CustomError extends AxiosError {
	errorMessage?: string;
    errorDetail?: string
}

export const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	// withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		// "Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Credentials": "true",
	},
});


API.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		console.log(config)
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error); 
	}
);