import { Link } from "react-router-dom";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { helpers } from "../../utils/helpers/functions";

function BasicCard(recipe: RecipeItem) {
	const { label, image, uri } = recipe;
	const recipeId = uri && helpers.getRecipeIdFromUrl(uri);
	return (
		<Link to={`/recipes/${recipeId}`} className="relative flex w-full h-[150px] bg-grey-light rounded-lg shadow-lg">
			<div className="w-1/3 h-full">
				<img className="rounded-[10px_0px_0px_10px] shadow-lg w-full h-full object-cover" src={image} alt="" />
			</div>
			<div className="w-2/3 flex flex-col bottom-0 left-0 right-0 rounded-[0px_10px_10px_0px] py-4 px-6">
				<div className=" max-h-14 overflow-hidden">
					<h1 className="text-lg text-bold font-black w-full">{label}</h1>
				</div>
				<p className="text-sm capitalize mt-1">{recipe.cuisineType[0]}</p>
				<div className="mt-auto flex gap-4">
					<button className="btn btn-card">Add</button>
					<button className="btn btn-card">View Recipe</button>
				</div>
			</div>
		</Link>
	);
}

export default BasicCard;
