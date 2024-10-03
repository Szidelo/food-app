import { Link } from "react-router-dom";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { helpers } from "../../utils/helpers/functions";
import { ICONS } from "../../utils/constants/saveIcons";
import useSaveRecipe from "../../customHooks/useSaveRecipe";

function BasicCard(recipe: RecipeItem) {
	const { label, image, uri } = recipe;
	const recipeId = uri && helpers.getRecipeIdFromUrl(uri);

	const { isSaved, handleSaveRecipe } = useSaveRecipe(recipe, uri);

	return (
		<div className="relative flex w-full h-[150px] bg-white rounded-lg shadow-lg">
			<div className="w-1/3 h-full">
				<Link to={`/recipes/${recipeId}`}>
					<img className="rounded-[10px_0px_0px_10px] shadow-lg w-full h-full object-cover" src={image} alt="" />
				</Link>
			</div>
			<div className="w-2/3 flex flex-col bottom-0 left-0 right-0 rounded-[0px_10px_10px_0px] py-4 px-6">
				<div className=" max-h-14 overflow-hidden">
					<h1 className="text-lg text-bold font-black w-full">{label}</h1>
				</div>
				<p className="text-sm capitalize mt-1">{recipe.cuisineType[0]}</p>
				<div className="mt-auto flex gap-4">
					<button onClick={handleSaveRecipe} className="btn btn-card">
						{isSaved ? ICONS.full : ICONS.empty}
					</button>
					<button className="btn btn-card">View Recipe</button>
				</div>
			</div>
		</div>
	);
}

export default BasicCard;
