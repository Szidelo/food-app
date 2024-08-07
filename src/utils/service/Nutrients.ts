import { URLS } from "../constants/urls";
import { RecipeParamsBody } from "../interfaces/items/itemsInterfaces";
import { NutritionDetailsResponse } from "../interfaces/providers/apiResponse";
import { NutrientAnalysisFetcher } from "./DataFetcher";

class NutrientService extends NutrientAnalysisFetcher {
	async getNutritionDetails(recipeData: RecipeParamsBody): Promise<NutritionDetailsResponse | null> {
		try {
			const response = await this.postRecipeData<NutritionDetailsResponse>(recipeData);
			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			return null;
		}
	}

	async getNutritionDetailsForIngredient(ingredient: string): Promise<NutritionDetailsResponse | null> {
		try {
			const response = await this.request<NutritionDetailsResponse>(
				`${URLS.NUTRITION_DATA}?nutrition-type=cooking&ingr=${ingredient}`
			);
			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			return null;
		}
	}
}

export const nutrientService = new NutrientService();
