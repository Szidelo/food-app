class Helpers {
	getRecipeIdFromUrl(url: string): string {
		return url.split("_")[1];
	}
}

export const helpers = new Helpers();
