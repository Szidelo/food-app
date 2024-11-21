import { useEffect, useState } from "react";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { firestoreService } from "../../utils/service/Firestore";
import { useAppSelector } from "../../redux/hooks/hooks";
import Spinner from "../Loaders/Spinner";
import { helpers } from "../../utils/helpers/functions";
import { recipeService } from "../../utils/service/Rceipe";
import FavoriteCard from "../Cards/FavoriteCard";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../../redux/slices/favoriteSlice";

function SavedRecipes() {
	const user = useAppSelector((state) => state.auth.user);
	const favSlice = useAppSelector((state) => state.favorite);
	const dispatch = useDispatch();
	const [favorites, setFavorites] = useState<RecipeItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!user) return;

		const fetchFavorites = async () => {
			setLoading(true);
			try {
				const res = await firestoreService.getRecipesFromDb(user);
				const data = await Promise.all(
					res!.docs.map(async (doc) => {
						const recipe = doc.data();
						const id = helpers.getRecipeIdFromUrl(recipe.uri);

						const fullRecipe = await recipeService.getRecipeById(id);

						return fullRecipe as RecipeItem;
					})
				);
				setFavorites(data);
			} catch (error) {
				console.error("Failed to fetch favorites:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFavorites();
	}, [user, favSlice]);

	const handleRemove = async (uri: string) => {
		if (user) await firestoreService.deleteRecipeFromDb(user, uri);
		const updatedFavorites = favorites.filter((item) => {
			item.uri !== uri;
			dispatch(removeFavorite(item));
		});

		setFavorites(updatedFavorites);
	};

	return (
		<div className="container px-2 lg:px-0 flex flex-wrap justify-between mx-auto my-14 gap-y-6 min-h-screen">
			{loading ? (
				<Spinner mode="dark" />
			) : (
				<>
					{favorites.length > 0 ? (
						favorites.map((item) => <FavoriteCard key={item.uri} recipe={item} onRemove={() => handleRemove(item.uri)} />)
					) : (
						<p>No favorites yet</p>
					)}
				</>
			)}
		</div>
	);
}

export default SavedRecipes;
