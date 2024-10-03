import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { useEffect, useState } from "react";
import { helpers } from "../../utils/helpers/functions";
import { Link } from "react-router-dom";
import { ICONS } from "../../utils/constants/saveIcons";
import useSaveRecipe from "../../customHooks/useSaveRecipe";

type PropsType = {
	img: string;
	title: string;
	description: string;
	id: string;
	recipe: RecipeItem;
};

function SmallCard(props: PropsType) {
	const { img, title, description, recipe, id } = props;

	const [recipeId, setRecipeId] = useState<string>("");
	const { isSaved, handleSaveRecipe } = useSaveRecipe(recipe, id);

	const getItemId = (uri: string) => {
		const id = helpers.getRecipeIdFromUrl(uri);
		setRecipeId(id);
	};

	useEffect(() => {
		getItemId(id);
	}, [id]);

	return (
		<div className="rounded-lg lg:w-[346px] h-[340px] w-full lg:px-0 px-4 shadow-md mb-10">
			<Link to={`/recipes/${recipeId}`}>
				<div className="card-image-wrapper h-3/5 w-full bg-center cursor-pointer">
					<img className="" loading="lazy" src={img} alt="background-image" />
				</div>
			</Link>
			<div className="p-4">
				<div className="h-8 overflow-hidden">
					<h2 className="text-xl font-extrabold">{title}</h2>
				</div>
				<p className="capitalize text-grey-dark">{description}</p>
			</div>
			<div className="px-4 flex gap-4">
				<button onClick={handleSaveRecipe} className="btn btn-card">
					{isSaved ? ICONS.full : ICONS.empty}
				</button>
				<Link to={`/recipes/${recipeId}`}>
					<button className="btn btn-card">View Recipe</button>
				</Link>
			</div>
		</div>
	);
}

export default SmallCard;
