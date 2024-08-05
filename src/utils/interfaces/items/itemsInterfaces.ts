import { RecipeItem } from "../providers/apiResponse";

export interface RecipeHit {
	recipe: RecipeItem;
}

export interface RecipeQueryOptions {
	mealType?: string;
	cuisineType?: string;
	health?: string;
}
