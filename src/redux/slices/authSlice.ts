import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/interfaces/items/itemsInterfaces";

export interface AuthState {
	user: null | User;
	isAuthenticated: boolean;
	token: string;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	token: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
		update(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		setAuthenticated(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
	},
});

export const { login, logout, update, setUser, setAuthenticated, setToken } = authSlice.actions;
export default authSlice.reducer;
