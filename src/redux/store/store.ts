import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import { apiSlice } from "../slices/breedApi";
import authSlice from "../slices/authSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		counter: counterReducer, // left for example
		[apiSlice.reducerPath]: apiSlice.reducer, // left for example
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
