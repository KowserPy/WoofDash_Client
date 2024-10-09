import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIncompleteTasksApi } from "../api/taskApi";

const initialState = {
	tasks: [],
	isError: false,
	isLoading: false,
	message: null,
};

// Async Thunk to fetch friends list (or tasks in this case)
export const getTasks = createAsyncThunk("tasks/getTasks", async (_, { rejectWithValue }) => {
	try {
		const data = await getIncompleteTasksApi();
		return data.tasks;
	} catch (error) {
		// If there is an error, return a rejected value with an error message
		return rejectWithValue(error.response ? error.response.data.message : error.message);
	}
});

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTasks.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = null;
			})
			.addCase(getTasks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.tasks = action.payload;
				state.isError = false;
			})
			.addCase(getTasks.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // The error message
			});
	},
});

export default tasksSlice.reducer;
