import axiosInstance from "./axiosInstance";

// get users incomplte tasks
export const getIncompleteTasksApi = async () => {
	try {
		const response = await axiosInstance.get("/tasks");
		return response.data;
	} catch (error) {
		throw error.response?.data?.message || "Something went wrong";
	}
};
