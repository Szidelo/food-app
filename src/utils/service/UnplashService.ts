import { URLS } from "../constants/urls";

const APP_KEY = import.meta.env.VITE_APP_UNSPLASH_KEY;

class ImageService {
	protected createUrl = (searchInput: string, page: number): string => {
		return `${URLS.BASE_UNSPLASH_URL}${URLS.SEARCH_PHOTOS}?page=${page}&query=food ${searchInput}&client_id=${APP_KEY}`;
	};

	async fetchImages(query: string): Promise<any> {
		const response = await fetch(this.createUrl(query, 1));
		const data = await response.json();
		console.log(data);

		return await data;
	}
}

export const imageService = new ImageService();
