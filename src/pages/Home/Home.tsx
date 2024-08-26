import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { recipeService } from "../../utils/service/Rceipe";
import SmallCard from "../../components/Cards/SmallCard";

function Home() {
	const [recipes, setRecipes] = useState<RecipeItem[]>([]);
	const buttons = ["Get Started", "Learn More"];
	const description =
		"Discover recipes, track ingredients with caloric info, and achieve your health goals with personalized BMI and daily caloric needs calculations. Create your perfect meal plan effortlessly with FoodApp.";

	useEffect(() => {
		recipeService.getRecipesByQuery("salad").then((res) => {
			setRecipes(res);
		});
	}, []);
	return (
		<div className="home__main">
			<Header type="home" title="Welcome to FoodApp" description={description} buttons={buttons} />
			<div className="container mx-auto my-24 flex flex-col ">
				<div className="mb-20">
					<h1 className="text-center font-extrabold text-4xl">Recepies you might like...</h1>
				</div>
				<div className="flex flex-wrap justify-between">
					{recipes.map((recipe, index) => {
						const { uri, image, cuisineType, label } = recipe;
						return index < 8 && <SmallCard key={uri} img={image} description={cuisineType[0]} id={uri} title={label} />;
					})}
				</div>
			</div>
		</div>
	);
}

export default Home;
