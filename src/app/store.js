import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import tasksReducer from "../features/taskSlice";
import { setupAxiosInterceptors } from "../api/axiosInstance";

const store = configureStore({
	reducer: {
		user: userReducer,
		tasks: tasksReducer,
		// Add other reducers here
	},
});

// Call the interceptor setup after the store is created, passing the store's dispatch
setupAxiosInterceptors(store.dispatch);

export default store;
