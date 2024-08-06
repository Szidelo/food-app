import { URLS } from "../constants/urls";
import { convertFoodParsedItem } from "../formatters/itemMapper";
import { FoodApiResponse, ParsedItem } from "../interfaces/providers/apiResponse";
import { FoodDbFetcher } from "./DataFetcher";

class FoodData extends FoodDbFetcher {
	async getFoodByQuery(query: string): Promise<FoodApiResponse> {
		try {
			const response = await this.request<FoodApiResponse>(`${URLS.FOOD_DB}?ingr=${query}&nutrition-type=cooking`).then(
				(response) => {
					console.log(response);
					if (!response) {
						throw new Error("No response from API");
					}
					return response;
				}
			);
			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}

	async getParsedFoodByQuery(query: string): Promise<ParsedItem[]> {
		try {
			const response = await this.request<FoodApiResponse>(`${URLS.FOOD_DB}?ingr=${query}&nutrition-type=cooking`).then(
				(response) => {
					console.log(response);
					if (!response) {
						throw new Error("No response from API");
					}
					return response ? convertFoodParsedItem(response) : [];
				}
			);
			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}
}

export const foodService = new FoodData();
