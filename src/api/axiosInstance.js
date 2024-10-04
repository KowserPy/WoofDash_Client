import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:8000/api/v1",
	// baseURL: "https://woofdash-backend.onrender.com/api/v1",
	withCredentials: true,
});

// Function to set up interceptors
export const setupAxiosInterceptors = (storeDispatch) => {
	// Add a request interceptor
	axiosInstance.interceptors.request.use(
		(config) => {
			const initData = window.Telegram.WebApp.initData;
			if (initData) {
				config.headers.Authorization = `initData ${initData}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response && error.response.status === 401) {
				// Use dispatch passed to the function to handle 401 errors
				storeDispatch({ type: "user/clearUserState" }); // Direct dispatch action
			}
			return Promise.reject(error);
		}
	);
};

export default axiosInstance;
