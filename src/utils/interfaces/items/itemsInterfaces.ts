import { RecipeItem } from "../providers/apiResponse";
// use export interface
// these are the interfaces for the items that we will use in the app components
export interface RecipeHit {
	recipe: RecipeItem;
}

export interface RecipeQueryOptions {
	mealType?: string;
	cuisineType?: string;
	health?: string;
}

export interface FoodQueryOptions {
	brand?: string;
	health?: string[];
}

export interface RecipeParamsBody {
	title: string;
	ingr: string[];
	url?: string;
	summary?: string;
	yield?: string;
	time?: string;
	img?: string;
	prep?: string;
}
