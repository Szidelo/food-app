import { RecipeItem } from "../interfaces/providers/apiResponse";
import { db } from "../../firebase/Firebase";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { User } from "../interfaces/items/itemsInterfaces";

class FirestoreService {
	async addRecipeToDb(recipe: RecipeItem, user: User | null): Promise<void> {
		try {
			if (user && recipe) {
				const { label, uri, image } = recipe;
				await addDoc(collection(db, "users", user.id, "recipes"), {
					title: label,
					uri,
					image,
				});
			} else {
				console.error("User is not authenticated");
			}
		} catch (error) {
			console.error("Error adding recipe to Firestore:", error);
		}
	}

	async getRecipesFromDb(user: User | null) {
		try {
			if (user) {
				const recipes = await getDocs(collection(db, "users", user.id, "recipes"));
				return recipes;
			} else {
				console.error("User is not authenticated");
			}
		} catch (error) {
			console.error("Error getting recipes from Firestore:", error);
		}
	}

	async deleteRecipeFromDb(user: User, uri: string) {
		try {
			await this.getRecipesFromDb(user).then((res) => {
				res?.forEach((doc) => {
					if (doc.data().uri === uri) {
						deleteDoc(doc.ref);
					}
				});
			});
		} catch (error) {
			console.error("Error deleting recipe from Firestore:", error);
		}
	}
}

export const firestoreService = new FirestoreService();
