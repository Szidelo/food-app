/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import { FaSpaghettiMonsterFlying } from "react-icons/fa6";
import { GiChickenOven, GiSadCrab } from "react-icons/gi";
import { LuSalad, LuDessert } from "react-icons/lu";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { recipeService } from "../../utils/service/Rceipe";
import SmallCard from "../Cards/SmallCard";
import Spinner from "../Loaders/Spinner";
import { IoMdSearch } from "react-icons/io";

type RecipeType = "pizza" | "chicken" | "salad" | "pasta" | "seafood" | "dessert" | "";

const CATEGORY_OF_FOOD: RecipeType[] = ["pizza", "chicken", "salad", "pasta", "seafood", "dessert"];
const FoodIcon = (type: RecipeType) => {
	const windowsWidth = window.innerWidth;
	const size = windowsWidth < 768 ? 25 : 35;
	switch (type) {
		case "pizza":
			return <FaPizzaSlice size={size} />;
		case "chicken":
			return <GiChickenOven size={size} />;
		case "salad":
			return <LuSalad size={size} />;
		case "pasta":
			return <FaSpaghettiMonsterFlying size={size} />;
		case "seafood":
			return <GiSadCrab size={size} />;
		case "dessert":
			return <LuDessert size={size} />;
		default:
			return null;
	}
};

const RANDOM_CATEGORY = () => {
	return CATEGORY_OF_FOOD[Math.floor(Math.random() * CATEGORY_OF_FOOD.length)];
};
function RecipeBrowse() {
	const [query, setQuery] = useState("");
	const [recipes, setRecipes] = useState<RecipeItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [recipeCategory, setRecipeCategory] = useState(RANDOM_CATEGORY);

	const handleSearch = () => {
		if (query === "") return;
		setLoading(true);
		setRecipeCategory("");
		recipeService
			.getRecipesByQuery(query)
			.then((res) => {
				setRecipes(res);
			})
			.catch((error) => {
				console.log(error);
				setError(error);
				setRecipes([]);
			});
		setLoading(false);
		setQuery("");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		setLoading(true);
		recipeService
			.getRecipesByQuery(recipeCategory)
			.then((res) => {
				setRecipes(res);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setError(error);
				setRecipes([]);
			});
	}, [recipeCategory]);
	return (
		<>
			<div className="container flex justify-center gap-7 lg:gap-10 w-full mx-auto mt-10 flex-wrap">
				{CATEGORY_OF_FOOD.map((category) => (
					<button
						onClick={() => setRecipeCategory(category)}
						key={category}
						className={`shadow-md btn btn-food-icon ${recipeCategory === category ? "active" : ""} `}>
						{FoodIcon(category)}
						<p className="text-center capitalize">{category}</p>
					</button>
				))}
			</div>
			<div className="mt-20 w-full">
				<div className="container max-w-3xl px-2 lg:px-0 mx-auto my-4 flex">
					<input
						className="search__input shadow-md"
						type="text"
						placeholder="Enter recipe keyword"
						value={query}
						onKeyUp={(e) => e.key === "Enter" && handleSearch()}
						onChange={handleChange}
					/>
					<button className="btn btn-search shadow-md" onClick={handleSearch}>
						<IoMdSearch size={35} />
					</button>
				</div>
				<div className="container px-2 lg:px-0 flex flex-wrap justify-between mx-auto mt-14">
					{loading && <Spinner />}
					{!loading && recipes.length > 0
						? recipes.map((recipe) => (
								<SmallCard
									key={recipe.uri}
									recipe={recipe}
									id={recipe.uri}
									title={recipe.label}
									description={recipe.cuisineType[0]}
									img={recipe.image}
								/>
						  ))
						: !loading && <p className="mx-auto">No recipes found</p>}
					{error && <p className="mx-auto">{error}</p>}
				</div>
			</div>
		</>
	);
}

export default RecipeBrowse;
