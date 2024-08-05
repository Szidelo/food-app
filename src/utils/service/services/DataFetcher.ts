import { URLS } from "../../constants/urls";

const APP_ID = import.meta.env.VITE_APP_API_RECIPE_ID;
const APP_KEY = import.meta.env.VITE_APP_API_RECIPE_KEY;

class DataFetcher {
	static createUrl = (url: string, ...args: string[]): string => {
		return `${URLS.BASE_URL}${url}&app_id=${APP_ID}&app_key=${APP_KEY}&${args && args.join("&")}`;
	};

	protected request = async <T extends object>(info: RequestInfo, init?: RequestInit): Promise<T | null> => {
		const defaultUrl = DataFetcher.createUrl(info as string);
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

export { DataFetcher };
