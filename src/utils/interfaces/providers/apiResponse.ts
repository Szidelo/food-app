interface Nutrient {
	label: string;
	quantity: number;
	unit: string;
}

interface Digest {
	label: string;
	tag: string;
	schemaOrgTag: string | null;
	total: number;
	hasRDI: boolean;
	daily: number;
	unit: string;
}

interface Ingredient {
	text: string;
	quantity: number;
	measure: string;
	food: string;
	weight: number;
	foodId: string;
	image?: string;
	foodCategory?: string;
}

interface Image {
	url: string;
	width: number;
	height: number;
}

interface Images {
	REGULAR: Image;
	SMALL: Image;
	THUMBNAIL: Image;
}

interface RecipeItem {
	calories: number;
	cautions: string[];
	co2EmissionsClass: string;
	cuisineType: string[];
	dietLabels: string[];
	digest: Digest[];
	dishType: string[];
	healthLabels: string[];
	image: string;
	images: Images;
	ingredientLines: string[];
	ingredients: Ingredient[];
	label: string;
	mealType: string[];
	shareAs: string;
	source: string;
	totalCO2Emissions: number;
	totalDaily: { [key: string]: Nutrient };
	totalNutrients: { [key: string]: Nutrient };
	totalTime: number;
	totalWeight: number;
	uri: string;
	url: string;
	yield: number;
}

interface Link {
	href: string;
}

interface Links {
	next: Link;
}

interface ApiResponse {
	count: number;
	from: number;
	hits: { recipe: RecipeItem }[];
	to: number;
	_links: Links;
}

interface Food {
	foodId: string;
	uri: string;
	label: string;
	knownAs: string;
	nutrients: { [key: string]: number };
	brand: string;
	category: string;
	categoryLabel: string;
	foodContentsLabel: string;
	image: string;
	servingSizes: {
		uri: string;
		label: string;
		quantity: number;
	}[];
	servingsPerContainer: number;
}

interface Measure {
	uri: string;
	label: string;
	weight: number;
	qualified: {
		qualifiers: {
			uri: string;
			label: string;
		}[];
		weight: number;
	}[];
}

interface ParsedItem {
	food: Food;
	quantity: number;
	measure: Measure;
}

interface Hint {
	pluCode: {
		code: string;
		category: string;
		commodity: string;
		variety: string;
		isRetailerAssigned: boolean;
	};
	food: Food;
	measures: Measure[];
}

interface FoodApiResponse {
	text: string;
	parsed: ParsedItem[];
	hints: Hint[];
	_links: {
		[key: string]: {
			href: string;
			title: string;
		};
	};
}

interface NutritionDetailsResponse {
	uri: string;
	yield: number;
	calories: number;
	totalCO2Emissions: number;
	co2EmissionsClass: string;
	totalWeight: number;
	dietLabels: string[];
	healthLabels: string[];
	cautions: string[];
	totalNutrients: TotalNutrients;
	ingredients: Ingredient[];
	cuisineType: string[];
	mealType: string[];
	dishType: string[];
	totalNutrientsKCal: TotalNutrientsKCal;
}

interface TotalNutrients {
	[key: string]: Nutrient;
}

interface Nutrient {
	label: string;
	quantity: number;
	unit: string;
}

interface Ingredient {
	text: string;
	parsed: ParsedIngredient[];
}

interface ParsedIngredient {
	quantity: number;
	measure: string;
	foodMatch: string;
	food: string;
	foodId: string;
	weight: number;
	retainedWeight: number;
	nutrients: { [key: string]: Nutrient };
	measureURI: string;
	status: string;
}

interface TotalNutrientsKCal {
	ENERC_KCAL: Nutrient;
	PROCNT_KCAL: Nutrient;
}

export type { RecipeItem, ApiResponse, FoodApiResponse, ParsedItem, Food, NutritionDetailsResponse };
