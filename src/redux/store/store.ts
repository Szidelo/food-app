import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import favoriteSlice from "../slices/favoriteSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		favorite: favoriteSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
