import { QuerySnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { RecipeItem } from "../interfaces/providers/apiResponse";

class Helpers {
	getRecipeIdFromUrl(url: string): string {
		return url.split("_")[1];
	}

	setRecipesFromDb(res: QuerySnapshot | undefined, callBack: Dispatch<SetStateAction<RecipeItem[]>>): void {
		const userRecipes: RecipeItem[] = [];
		if (res) {
			res.forEach((doc) => {
				userRecipes.push(doc.data() as RecipeItem);
			});
			callBack(userRecipes);
		} else {
			console.error("No recipes found");
		}
	}

	formatErrorCode(errorCode: string): string {
		return errorCode.split("/")[1].replace(/-/g, " ").split(" ").join(" ");
	}
}

export const helpers = new Helpers();
