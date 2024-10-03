import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";

const initialState: RecipeItem[] = [];

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<RecipeItem>) => {
			state.push(action.payload);
		},
		removeFavorite: (state, action: PayloadAction<RecipeItem>) => {
			return state.filter((item) => item.uri !== action.payload.uri);
		},
	},
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
