import { URLS } from "../constants/urls";
import { convertFoodParsedItem } from "../formatters/itemMapper";
import { FoodQueryOptions } from "../interfaces/items/itemsInterfaces";
import { FoodApiResponse, ParsedItem } from "../interfaces/providers/apiResponse";
import { FoodDbFetcher } from "./DataFetcher";

class FoodData extends FoodDbFetcher {
	async getFoodByQuery(query: string, options?: FoodQueryOptions): Promise<FoodApiResponse> {
		const params = new URLSearchParams();
		params.append("ingr", query);
		params.append("nutrition-type", "cooking");

		if (options) {
			Object.entries(options).forEach(([key, value]) => {
				if (value) {
					params.append(key, value);
				}
			});
		}

		const url = `${URLS.FOOD_DB}?${params.toString()}`;

		try {
			const response = await this.request<FoodApiResponse>(url).then((response) => {
				console.log(response);
				if (!response) {
					throw new Error("No response from API");
				}
				return response;
			});
			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}

	async getParsedFoodByQuery(query: string): Promise<ParsedItem[]> {
		const params = new URLSearchParams();
		params.append("ingr", query);
		params.append("nutrition-type", "cooking");

		const url = `${URLS.FOOD_DB}?${params.toString()}`;

		try {
			const response = await this.request<FoodApiResponse>(url).then((response) => {
				console.log(response);
				if (!response) {
					throw new Error("No response from API");
				}
				return response ? convertFoodParsedItem(response) : [];
			});
			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}
}

export const foodService = new FoodData();
