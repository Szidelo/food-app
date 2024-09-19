import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { recipeService } from "../../utils/service/Rceipe";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import Spinner from "../../components/Loaders/Spinner";
import HeaderCard from "../../components/Cards/HeaderCard";
import BasicCard from "../../components/Cards/BasicCard";

function RecipeDetails() {
	const [recipe, setRecipe] = useState<RecipeItem | null>(null);
	const [loading, setLoading] = useState(false);
	const [similarRecipes, setSimilarRecipes] = useState<RecipeItem[]>([]);
	const [numberOfSimilarRecipes, setNumberOfSimilarRecipes] = useState(4);
	const location = useLocation();

	const handleSimilarRecipes = () => {
		setNumberOfSimilarRecipes((prev) => prev + 4);
	};

	useEffect(() => {
		const recipeId = location.pathname.split("/").pop();
		if (recipeId) {
			setLoading(true);
			recipeService.getRecipeById(recipeId).then((response) => {
				console.log(response);
				setRecipe(response);
				setLoading(false);
				setNumberOfSimilarRecipes(4);
			});
		} else {
			<Navigate to="/recipes" />; // TODO: Add a 404 page
		}
	}, [location.pathname]);

	useEffect(() => {
		if (recipe) {
			recipeService
				.getRecipesByQuery(recipe.dishType !== undefined ? recipe.dishType[0] : recipe.cuisineType[0])
				.then((response) => {
					setSimilarRecipes(response);
				})
				.catch((err) => console.log("dishtypeError", err));
		}
	}, [recipe]);

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen w-full">
				<Spinner />
			</div>
		);

	return (
		<section className="mb-20">
			<div className="container mx-auto mt-48 flex">
				<div className="w-2/3">
					{recipe && <HeaderCard {...recipe} />}
					<div className="bg-grey p-4 rounded-lg shadow-lg">
						<div className="w-full">
							<h1 className="text-4xl font-bold mb-10">{recipe?.ingredients.length} Ingredients</h1>
							<table className="details__table table-auto w-full">
								<thead className="text-left">
									<tr>
										<th className="p-2">Image</th>
										<th className="p-2">Ingredient</th>
										<th className="p-2">Measure</th>
										<th className="p-2">Weight</th>
										<th className="p-2">Link</th>
									</tr>
								</thead>
								<tbody>
									{recipe?.ingredients.map((ingredient, i) => {
										const { image, food, text, weight, foodId: id } = ingredient;

										return (
											<tr key={id + i}>
												<td className="p-2 w-20">
													<img src={image} alt={text} className="w-16 h-16 rounded-lg object-cover shadow-md" />
												</td>
												<td className="p-2 capitalize">{food}</td>
												<td className="p-2">{text}</td>
												<td className="p-2 min-w-28">{weight.toFixed()}g</td>
												<td className="p-2 min-w-28">
													<a className="btn btn-card p-0" href="#">
														View
													</a>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<div className="w-1/2"></div>
					</div>
				</div>
				<div className="w-1/3 bg-white rounded-xl shadow-lg p-4 ms-5">
					<h1 className="text-4xl font-bold text-center mb-10">Similar Recipes</h1>
					<div className="flex flex-wrap items-center justify-center gap-6 recipe__similar-list">
						{similarRecipes.length > 0 &&
							similarRecipes.map((recipe, i) => {
								return i < numberOfSimilarRecipes && <BasicCard key={recipe.uri} {...recipe} />;
							})}
						<button
							disabled={numberOfSimilarRecipes >= similarRecipes.length - 1}
							onClick={handleSimilarRecipes}
							className="btn btn-dark">
							View More
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RecipeDetails;
