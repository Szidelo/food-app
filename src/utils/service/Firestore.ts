import { RecipeItem } from "../interfaces/providers/apiResponse";
import { db } from "../../firebase/Firebase";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, setDoc } from "firebase/firestore";
import { HealthData, User, UserData } from "../interfaces/items/itemsInterfaces";
import { QuerySnapshot } from "firebase/firestore/lite";

class FirestoreService {
	async addRecipeToDb(recipe: RecipeItem, user: User | null): Promise<void> {
		try {
			if (user && recipe) {
				const { label, uri, image } = recipe;
				const existingRecipesSnapshot = await this.getRecipesFromDb(user);
				const existingRecipes = existingRecipesSnapshot?.docs.map((doc) => doc.data());
				const recipeExists = existingRecipes?.some((doc) => doc.uri === uri);

				if (recipeExists) {
					console.log("Recipe already exists in Firestore");
					return;
				}

				await addDoc(collection(db, "users", user.id, "favoriteRecipes"), {
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
				const recipes = await getDocs(collection(db, "users", user.id, "favoriteRecipes"));
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

	async saveUserDataToDb(user: User, userData: UserData): Promise<void> {
		try {
			const docRef = doc(db, "users", user.id, "userData", "contactInfo");
			await setDoc(docRef, userData);
			console.log("User data saved to Firestore");
		} catch (error) {
			console.error("Error saving user data to Firestore:", error);
		}
	}

	async saveUpdatedHealthDataToDb(user: User, healthData: HealthData): Promise<void> {
		try {
			const date = new Date();
			const formattedDate = `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

			const docRef = doc(db, "users", user.id, "userData", "healthData", "byDate", formattedDate);
			await setDoc(docRef, {
				...healthData,
				updatedAt: formattedDate,
			});
		} catch (error) {
			console.error("Error saving updated health data to Firestore:", error);
		}
	}

	async getHealthDataUpdates(user: User | null): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
		try {
			if (user) {
				const updates = await getDocs(collection(db, "users", user.id, "healthDataUpdates"));
				return updates;
			} else {
				console.error("User is not authenticated");
			}
		} catch (error) {
			console.error("Error getting health data updates from Firestore:", error);
		}
	}
}

export const firestoreService = new FirestoreService();
