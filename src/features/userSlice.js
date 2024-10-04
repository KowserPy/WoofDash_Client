import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserApi, getProfileApi } from "../api/userApi";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null, // Get user from localStorage
	isAuthenticated: !!localStorage.getItem("user"), // Check if user exists
	isError: false,
	isLoading: false,
	message: null,
};

// Async Thunk for user creation or login
export const createUser = createAsyncThunk("user/createUser", async (userData, { rejectWithValue }) => {
	try {
		const data = await createUserApi(userData); // Use the API service here
		console.log(data);
		localStorage.setItem("user", JSON.stringify(data)); // Store user in localStorage
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

// Async Thunk to get user profile
export const getProfile = createAsyncThunk("user/getProfile", async (_, { rejectWithValue }) => {
	try {
		const data = await getProfileApi(); // Use the API service here
		localStorage.setItem("user", JSON.stringify(data)); // Update user in localStorage
		return data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearUserState: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.isError = false;
			state.isLoading = false;
			state.message = "Successfully logged out";
			localStorage.removeItem("user"); // Clear user from localStorage
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = null;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthenticated = true;
				state.isLoading = false;
				state.isError = false;
				state.message = "Login successful";
			})
			.addCase(createUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.message = null;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthenticated = true;
				state.isLoading = false;
				state.isError = false;
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
