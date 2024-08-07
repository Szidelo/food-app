import { FoodApiResponse, ParsedItem, RecipeItem } from "../interfaces/providers/apiResponse";

export function convertRecipeItem(hits: { recipe: RecipeItem }[]): RecipeItem[] {
	return hits.map((item) => {
		const image = item.recipe.images.LARGE ? item.recipe.images.LARGE.url : item.recipe.images.REGULAR.url;
		return {
			...item.recipe,
			image,
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
