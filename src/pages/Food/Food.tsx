import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { recipeService } from "../../utils/service/Rceipe";
import Spinner from "../../components/Loaders/Spinner";
import SmallCard from "../../components/Cards/SmallCard";

function Food() {
	const [query, setQuery] = useState("");
	const [recipes, setRecipes] = useState<RecipeItem[]>([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = () => {
		setLoading(true);
		recipeService
			.getRecipesByQuery(query)
			.then((res) => {
				setRecipes(res);
			})
			.catch((error) => {
				console.log(error);
				setRecipes([]);
			});
		setLoading(false);
		setQuery("");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		handleSearch();
	}, []);

	return (
		<section className="food__main">
			<Header type="food" title="Food" buttons={[]} />
			<div className="mt-20 w-full">
				<div className="w-5/6 mx-auto flex">
					<input className="search__input" type="text" placeholder="Enter recipe keyword" value={query} onChange={handleChange} />
					<button className="btn btn-search" onClick={handleSearch}>
						Search
					</button>
				</div>
				<div className="container flex flex-wrap justify-between mx-auto mt-14">
					{loading && <Spinner />}
					{recipes.length > 0 ? (
						recipes.map((recipe) => (
							<SmallCard
								key={recipe.uri}
								recipe={recipe}
								id={recipe.uri}
								title={recipe.label}
								description={recipe.cuisineType[0]}
								img={recipe.image}
							/>
						))
					) : (
						<p className="mx-auto">No recipes found</p>
					)}
				</div>
			</div>
		</section>
	);
}

export default Food;
