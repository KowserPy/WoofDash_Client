import axiosInstance from "./axiosInstance";

// Function to handle user creation or login
export const createUserApi = async (userData) => {
	try {
		const response = await axiosInstance.post("/user", userData);
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || "Something went wrong";
	}
};

// Function to fetch user profile
export const getProfileApi = async () => {
	try {
		const response = await axiosInstance.get("/me");
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || "Something went wrong";
	}
};
