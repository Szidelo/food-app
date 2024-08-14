import { useState } from "react";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { recipeService } from "../../utils/service/Rceipe";
import { useAppSelector } from "../../redux/hooks/hooks";
import { firestoreService } from "../../utils/service/Firestore";
import { helpers } from "../../utils/helpers/functions";
import { FirestoreData } from "../../utils/interfaces/items/itemsInterfaces";

function DbTestPage() {
	const [recipes, setRecipes] = useState<RecipeItem[]>([]);
	const [query, setQuery] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);
	const [data, setData] = useState<FirestoreData[]>([]);

	const user = useAppSelector((state) => state.auth.user);

	const handleSearch = () => {
		setLoading(true);
		try {
			recipeService.getRecipesByQuery(query).then((res) => {
				setRecipes(res);
			});
		} catch (error) {
			console.log(error);
			setRecipes([]);
		}
		setLoading(false);
		setQuery("");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const addToDb = async (recipe: RecipeItem) => {
		setSelectedRecipe(recipe);
		await firestoreService.addRecipeToDb(recipe, user);
	};

	const getDb = async () => {
		await firestoreService.getRecipesFromDb(user).then((res) => {
			helpers.setRecipesFromDb(res, setData);
		});
	};

	const deleteRecipe = async (uri: string) => {
		if (user) await firestoreService.deleteRecipeFromDb(user, uri);
	};

	return (
		<div>
			<div>
				<input type="text" placeholder="Enter recipe keyword" onChange={handleChange} value={query} />
				<button onClick={handleSearch}>Search</button>
				<button onClick={getDb}>Get</button>
			</div>
			{loading && <p>Loading...</p>}
			{data.length > 0 && (
				<div>
					<h2>{user?.name}'s Recipes:</h2>

					{data.map((item) => (
						<div onClick={() => deleteRecipe(item.uri)} key={item.uri}>
							<h3>{item.title}</h3>
							<p>{item.uri}</p>
							<img src={item.image} alt={item.title} />
						</div>
					))}
				</div>
			)}
			{recipes.length > 0 ? (
				<div>
					{recipes.map((recipe) => (
						<div key={recipe.uri} onClick={() => addToDb(recipe)}>
							<h2>{recipe.label}</h2>
							<img src={recipe.image} alt={recipe.label} />
						</div>
					))}
				</div>
			) : (
				<p>No recipes found</p>
			)}
			{selectedRecipe && <p>Added {selectedRecipe.label} to database</p>}
		</div>
	);
}

export default DbTestPage;
