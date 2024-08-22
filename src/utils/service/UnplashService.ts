import { URLS } from "../constants/urls";

const APP_KEY = import.meta.env.VITE_APP_UNSPLASH_KEY;

class ImageService {
	protected createUrl = (
		searchInput: string,
		page: number = 1,
		perPage: number = 10,
		orientation: string = "landscape",
		orderBy: string = "relevant"
	): string => {
		const baseUrl = `${URLS.BASE_UNSPLASH_URL}${URLS.SEARCH_PHOTOS}`;
		const query = `?page=${page}&per_page=${perPage}&query=${searchInput}`;
		const additionalParams = `&orientation=${orientation}&order_by=${orderBy}`;
		const clientId = `&client_id=${APP_KEY}`;

		return `${baseUrl}${query}${additionalParams}&xp=search-disable-synonyms%3Acontrol${clientId}`;
	};
	async fetchImages(
		query: string,
		page: number = 1,
		perPage: number = 10,
		orientation: string = "landscape",
		orderBy: string = "relevant"
	): Promise<any> {
		const formattedQuery = query.trim().replace(/ /g, "+");

		const response = await fetch(this.createUrl(formattedQuery, page, perPage, orientation, orderBy));
		const data = await response.json();
		console.log(data);

		return data;
	}
}

export const imageService = new ImageService();
