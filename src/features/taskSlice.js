import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { completeATaskApi, getIncompleteTasksApi } from "../api/taskApi";

const initialState = {
	tasks: [],
	isError: false,
	isLoading: false,
	message: null,
};

// Async Thunk to fetch incomplete tasks
export const getTasks = createAsyncThunk("tasks/getTasks", async (_, { rejectWithValue }) => {
	try {
		const data = await getIncompleteTasksApi();
		return data.tasks;
	} catch (error) {
		// If there is an error, return a rejected value with an error message
		return rejectWithValue(error.response ? error.response.data.message : error.message);
	}
});

// Async Thunk to complete a task
export const completeaTASK = createAsyncThunk("tasks/complete", async (taskId, { rejectWithValue }) => {
	try {
		const data = await completeATaskApi(taskId);
		return data;
	} catch (error) {
		console.log(error);
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
			})
			.addCase(completeaTASK.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = null;
			})
			.addCase(completeaTASK.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.message = "Task completed successfully";
			})
			.addCase(completeaTASK.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // The error message
			});
	},
});

export default tasksSlice.reducer;
