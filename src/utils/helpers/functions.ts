import { QuerySnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { FirestoreData } from "../interfaces/items/itemsInterfaces";

class Helpers {
	getRecipeIdFromUrl(url: string): string {
		return url.split("_")[1];
	}

	setRecipesFromDb(res: QuerySnapshot | undefined, callBack: Dispatch<SetStateAction<FirestoreData[]>>): void {
		const userRecipes: FirestoreData[] = [];
		if (res) {
			res.forEach((doc) => {
				userRecipes.push(doc.data() as FirestoreData);
			});
			callBack(userRecipes);
		} else {
			console.error("No recipes found");
		}
	}

	formatErrorCode(errorCode: string): string {
		return errorCode
			.split("/")[1]
			.replace(/-/g, " ")
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}
}

export const helpers = new Helpers();
