import { useState, useEffect } from "react";
import { helpers } from "../../utils/helpers/functions";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { Link } from "react-router-dom";
import "./favoriteCard.css";

interface PropType {
	recipe: RecipeItem;
	onRemove: () => void;
}

function FavoriteCard(props: PropType) {
	const { label, uri: id, image, cuisineType } = props.recipe;
	const { onRemove } = props;
	const [recipeId, setRecipeId] = useState<string>("");
	const [loaded, setLoaded] = useState(false);

	const getItemId = (uri: string) => {
		const id = helpers.getRecipeIdFromUrl(uri);
		setRecipeId(id);
	};

	useEffect(() => {
		getItemId(id);
	}, [id]);

	return (
		<div
			className={`relative w-full max-w-[300px] h-[350px] bg-gray-100 shadow-lg rounded-lg overflow-hidden transition duration-300 ${
				loaded ? "fade-in" : ""
			}`}>
			<button
				className="absolute top-2 right-2 z-10 bg-red-500 text-white font-extrabold text-2xl rounded-full h-10 w-10 shadow-md hover:bg-red-600 hover:scale-105 hover:rotate-90 transition duration-300"
				onClick={onRemove}>
				✕
			</button>

			<img
				className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
					loaded ? "opacity-100" : "opacity-0"
				}`}
				src={image}
				alt={label}
				loading="lazy"
				onLoad={() => setLoaded(true)}
			/>

			<Link
				to={`/recipes/${recipeId}`}
				className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent text-white flex items-center justify-between backdrop-blur-[3px] hover:bg-black/50 transition duration-300">
				<div>
					<h3 className="text-xl font-semibold">{label}</h3>
					<p className="text-lg">{cuisineType?.join(", ")}</p>
				</div>
			</Link>
		</div>
	);
}

export default FavoriteCard;
