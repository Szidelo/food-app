import { URLS } from "../constants/urls";
import { convertRecipeItem } from "../formatters/itemMapper";
import { RecipeHit, RecipeQueryOptions } from "../interfaces/items/itemsInterfaces";
import { ApiResponse, RecipeItem } from "../interfaces/providers/apiResponse";
import { DataFetcher } from "./DataFetcher";

class Recipe extends DataFetcher {
	async getRecipesByQuery(query: string, options?: RecipeQueryOptions): Promise<RecipeItem[]> {
		const params = new URLSearchParams();
		params.append("q", query);

		if (options) {
			Object.entries(options).forEach(([key, value]) => {
				if (value) {
					params.append(key, value);
				}
			});
		}

		try {
			const response = await this.request<ApiResponse>(`${URLS.SEARCH}${URLS.TYPE_ANY}&${params.toString()}`).then((response) => {
				return response ? convertRecipeItem(response.hits) : [];
			});

			return response;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	async getRecipeById(id: string): Promise<RecipeItem | null> {
		try {
			const response = await this.request<RecipeHit>(`${URLS.SEARCH_ID}${id}?${URLS.TYPE_PUBLIC}`).then((response) => {
				return response ? response.recipe : null;
			});

			return response;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export const recipeService = new Recipe();
