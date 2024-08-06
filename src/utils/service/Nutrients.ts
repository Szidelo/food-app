import { NutrientAnalysisFetcher } from "./DataFetcher";

class NutrientService extends NutrientAnalysisFetcher {
	async getNutritionDetails(recipeData: object): Promise<any> {
		try {
			const response = await this.request<any>("/api/nutrition-details", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(recipeData),
			});

			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}
}

export const nutrientService = new NutrientService();
