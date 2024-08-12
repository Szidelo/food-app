import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/interfaces/items/itemsInterfaces";

export interface AuthState {
	user: null | User;
}

const initialState: AuthState = {
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		logout(state) {
			state.user = null;
		},
		update(state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
	},
});

export const { login, logout, update } = authSlice.actions;
export default authSlice.reducer;
