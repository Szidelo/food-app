import { useState, useEffect } from "react";
import "./App.css";
import { recipeService } from "./utils/service/services/Rceipe";
import { RecipeItem } from "./utils/interfaces/providers/apiResponse";
import { helpers } from "./utils/helpers/functions";

function App() {
	const [data, setData] = useState<RecipeItem[]>([]);
	const [recipeId, setRecipeId] = useState<string>("");
	const [recipe, setRecipe] = useState<RecipeItem | null>(null);

	const getItemId = (uri: string) => {
		const id = helpers.getRecipeIdFromUrl(uri);
		setRecipeId(id);
	};

	useEffect(() => {
		recipeService
			.getRecipesByQuery("chicken", {
				mealType: "Breakfast",
				cuisineType: "Mexican",
				health: "alcohol-free",
			})
			.then((response) => {
				setData(response);
				console.log("Data fetched:", response);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		if (recipeId) {
			recipeService
				.getRecipeById(recipeId)
				.then((response) => {
					setRecipe(response);
					console.log("Recipe fetched:", response);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [recipeId]);

	useEffect(() => {
		console.log("Data updated:", data);
	}, [data]);

	return (
		<>
			<ul>
				{recipe && (
					<li>
						<h2>{recipe.label}</h2>
						<p>{recipe.source}</p>
						<ul>
							{recipe.ingredientLines.map((ingredient, index) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</li>
				)}
			</ul>
			<ul>
				{data.map((item) => {
					const { label, image, source, uri } = item;
					return (
						<li key={uri} onClick={() => getItemId(uri)}>
							<img loading="lazy" src={image} alt={label} />
							<h2>{label}</h2>
							<p>{source}</p>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default App;
