import { useEffect, useState } from "react";
import { RecipeItem } from "../utils/interfaces/providers/apiResponse";
import { useAppSelector } from "../redux/hooks/hooks";
import { useDispatch } from "react-redux";
import { removeFavorite, addFavorite } from "../redux/slices/favoriteSlice";
import { firestoreService } from "../utils/service/Firestore";

function useSaveRecipe(recipe: RecipeItem, recipeId: string) {
	const user = useAppSelector((state) => state.auth.user);
	const savedRecipes = useAppSelector((state) => state.favorite);
	const dispatch = useDispatch();
	const [isSaved, setIsSaved] = useState<boolean>(false);

	useEffect(() => {
		savedRecipes?.forEach((doc) => {
			if (doc.uri === recipeId) {
				setIsSaved(true);
			}
		});
	}, [recipeId, savedRecipes]);

	const handleSaveRecipe = async () => {
		if (isSaved && user) {
			firestoreService.deleteRecipeFromDb(user, recipeId);
			dispatch(removeFavorite(recipe));
			setIsSaved(false);
		} else {
			firestoreService.addRecipeToDb(recipe, user);
			dispatch(addFavorite(recipe));
			setIsSaved(true);
		}
	};

	return { handleSaveRecipe, isSaved };
}

export default useSaveRecipe;
