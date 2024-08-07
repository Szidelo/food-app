import { URLS } from "../constants/urls";
import { RecipeParamsBody } from "../interfaces/items/itemsInterfaces";
import { NutritionDetailsResponse } from "../interfaces/providers/apiResponse";
import { NutrientAnalysisFetcher } from "./DataFetcher";

class NutrientService extends NutrientAnalysisFetcher {
	async getNutritionDetails(recipeData: RecipeParamsBody): Promise<NutritionDetailsResponse | null> {
		try {
			const response = await this.postRecipeData<NutritionDetailsResponse>(URLS.NUTRITION, recipeData);
			return response as NutritionDetailsResponse;
		} catch (error) {
			console.error("Error fetching data:", error);
			return null;
		}
	}
}

export const nutrientService = new NutrientService();
