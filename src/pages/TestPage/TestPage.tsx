import { useEffect, useState } from "react";
import { helpers } from "../../utils/helpers/Functions";
import { RecipeParamsBody } from "../../utils/interfaces/items/itemsInterfaces";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { foodService } from "../../utils/service/FoodDb";
import { nutrientService } from "../../utils/service/Nutrients";
import { recipeService } from "../../utils/service/Rceipe";
import { Link } from "react-router-dom";
import Card from "../../components/UserCard/UserCard";

function TestPage() {
	const [recipes, setRecipes] = useState<RecipeItem[]>([]);
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
			.getRecipesByQuery("", {
				mealType: "Breakfast",
				cuisineType: "Mexican",
				health: "alcohol-free",
			})
			.then((response) => {
				setRecipes(response);
				console.log("recipes fetched:", response);
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
		console.log("recipes updated:", recipes);
	}, [recipes]);

	return (
		<>
			<div>
				<h4>Logged as:</h4>
				<Card />
			</div>
			<div>
				<Link to="/">
					<button>Home</button>
				</Link>
			</div>

			<ul>
				{recipe ? (
					<li>
						<h2>{recipe.label}</h2>
						<p>{recipe.source}</p>
						<ul>
							{recipe.ingredientLines.map((ingredient, index) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
					</li>
				) : (
					<li>
						<h1>Please select a recipe to see nutrients</h1>
					</li>
				)}
			</ul>
			<ul>
				{recipes.map((item) => {
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

export default TestPage;
