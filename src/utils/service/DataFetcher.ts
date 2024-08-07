import { URLS } from "../constants/urls";
import { RecipeParamsBody } from "../interfaces/items/itemsInterfaces";

const APP_ID = import.meta.env.VITE_APP_API_RECIPE_ID;
const APP_KEY = import.meta.env.VITE_APP_API_RECIPE_KEY;
const APP_ID_FOOD = import.meta.env.VITE_APP_API_FOOD_DB_ID;
const APP_KEY_FOOD = import.meta.env.VITE_APP_API_FOOD_DB_KEY;
const APP_ID_NUTRITION = import.meta.env.VITE_APP_API_NUTRITION_ID;
const APP_KEY_NUTRITION = import.meta.env.VITE_APP_API_NUTRITION_KEY;

class DataFetcher {
	protected createUrl = (url: string, ...args: string[]): string => {
		return `${URLS.BASE_URL}${url}&${args && args.join("&")}&app_id=${APP_ID}&app_key=${APP_KEY}`;
	};

	protected request = async <T extends object>(info: RequestInfo, init?: RequestInit): Promise<T | null> => {
		const defaultUrl = this.createUrl(info as string);
		const defaultParams = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept-Language": "en",
			},
		};

		const response = await fetch(defaultUrl, {
			...defaultParams,
			...init,
		});

		return this.handleResponse<T>(response);
	};

	protected handleResponse = async <T extends object>(response: Response): Promise<T | null> => {
		const data: T = await response.json();
		if (response.status !== 200) {
			console.error("Error:", data);
			return null;
		}
		return data;
	};
}

class FoodDbFetcher extends DataFetcher {
	protected createUrl = (url: string, ...args: string[]): string => {
		return `${URLS.BASE_URL}${url}&${args && args.join("&")}&app_id=${APP_ID_FOOD}&app_key=${APP_KEY_FOOD}`;
	};
}

class NutrientAnalysisFetcher extends DataFetcher {
	protected createUrl = (url: string): string => {
		return `${URLS.BASE_URL}${url}&app_id=${APP_ID_NUTRITION}&app_key=${APP_KEY_NUTRITION}`;
	};

	protected createPostUrl = (): string => {
		return `${URLS.BASE_URL}${URLS.NUTRITION_DETAILS}?app_id=${APP_ID_NUTRITION}&app_key=${APP_KEY_NUTRITION}`;
	};

	public postRecipeData = async <T extends object>(recipeData: RecipeParamsBody, init?: RequestInit): Promise<T | null> => {
		const defaultUrl = this.createPostUrl();
		const defaultParams = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(recipeData),
		};

		const response = await fetch(defaultUrl, {
			...defaultParams,
			...init,
		});

		return this.handleResponse<T>(response);
	};
}

export { DataFetcher, FoodDbFetcher, NutrientAnalysisFetcher };
