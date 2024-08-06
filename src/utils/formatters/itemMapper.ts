import { FoodApiResponse, ParsedItem, RecipeItem } from "../interfaces/providers/apiResponse";

export function convertRecipeItem(hits: { recipe: RecipeItem }[]): RecipeItem[] {
	return hits.map((item) => {
		return {
			...item.recipe,
			image: item.recipe.images.REGULAR.url,
		};
	});
}

export function convertFoodParsedItem(apiResponse: FoodApiResponse): ParsedItem[] {
	return apiResponse.parsed.map((item): ParsedItem => {
		return {
			food: item.food,
			quantity: item.quantity,
			measure: item.measure,
		};
	});
}
