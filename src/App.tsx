import { useState, useEffect } from "react";
import "./App.css";
import { recipeService } from "./utils/service/Rceipe";
import { RecipeItem } from "./utils/interfaces/providers/apiResponse";
import { helpers } from "./utils/helpers/functions";
import { foodService } from "./utils/service/FoodDb";
import { nutrientService } from "./utils/service/Nutrients";
import { RecipeParamsBody } from "./utils/interfaces/items/itemsInterfaces";

function App() {
	const [data, setData] = useState<RecipeItem[]>([]);
	const [recipeId, setRecipeId] = useState<string>("");
	const [recipe, setRecipe] = useState<RecipeItem | null>(null);

	const getItemId = (uri: string) => {
		console.log("URI:", uri);

		const id = helpers.getRecipeIdFromUrl(uri);
		setRecipeId(id);
	};

	useEffect(() => {
		foodService
			.getFoodByQuery("wings", {
				brand: "McDonald's",
			})
			.then((response) => {
				console.log("Food fetched:", response);
			});
	}, []);

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
		nutrientService.getNutritionDetailsForIngredient("2 eggs").then((response) => {
			console.log("Ingredient details fetched:", response);
		});
	}, []);

	useEffect(() => {
		const apiBody: RecipeParamsBody = {
			title: "Chicken Salad",
			ingr: [
				"2 cups chopped cooked chicken breast",
				"1/2 cup mayonnaise",
				"1/4 cup chopped celery",
				"1/4 cup chopped green onions",
				"1 tablespoon lemon juice",
				"Salt and pepper to taste",
			],
			yield: "1",
		};

		nutrientService.getNutritionDetails({ ...apiBody }).then((response) => {
			console.log("Nutrition details fetched:", response);
		});
	}, []);

	useEffect(() => {
		if (recipeId) {
			console.log("Fetching recipe:", recipeId);

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
