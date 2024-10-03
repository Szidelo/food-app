import { Gender } from "../../helpers/Health";
import { RecipeItem } from "../providers/apiResponse";
// use export interface
// these are the interfaces for the items that we will use in the app components
export interface RecipeHit {
	recipe: RecipeItem;
}

export interface User {
	email: string;
	picture?: string;
	name?: string;
	id: string;
}

export interface RecipeQueryOptions {
	mealType?: string;
	cuisineType?: string;
	health?: string;
}

export interface FoodQueryOptions {
	brand?: string;
	health?: string[];
}

export interface RecipeParamsBody {
	title: string;
	ingr: string[];
	url?: string;
	summary?: string;
	yield?: string;
	time?: string;
	img?: string;
	prep?: string;
}

export interface UserData {
	displayName: string;
	photoURL: string;
	email: string;
	id?: string;
}

export interface FirestoreData {
	title: string;
	uri: string;
	image: string;
}

export interface HealthData {
	weight: number;
	height: number;
	age: number;
	gender: Gender;
	activityLevel: string;
}
