import { RecipeItem } from "../interfaces/providers/apiResponse";
import { db } from "../../firebase/Firebase";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, setDoc } from "firebase/firestore";
import { HealthData, User } from "../interfaces/items/itemsInterfaces";
import { QuerySnapshot } from "firebase/firestore/lite";

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

	async saveInitialHealthDataToDb(user: User, healthData: HealthData): Promise<void> {
		try {
			const docRef = doc(db, "users", user.id, "healthData", "initialHealthData");
			await setDoc(docRef, healthData);
		} catch (error) {
			console.error("Error saving initial health data to Firestore:", error);
		}
	}

	async saveUpdatedHealthDataToDb(user: User, healthData: HealthData): Promise<void> {
		try {
			const date = new Date();
			const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

			const docRef = doc(db, "users", user.id, "healthDataUpdates", formattedDate);
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

	async getInitialHealthData(user: User | null): Promise<DocumentData | undefined> {
		try {
			if (user) {
				const healthData = await getDocs(collection(db, "users", user.id, "healthData"));
				return healthData.docs[0].data();
			} else {
				console.error("User is not authenticated");
			}
		} catch (error) {
			console.error("Error getting initial health data from Firestore:", error);
		}
	}
}

export const firestoreService = new FirestoreService();
