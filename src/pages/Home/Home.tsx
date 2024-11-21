import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import { recipeService } from "../../utils/service/Rceipe";
import FoodGallery from "../../components/FoodGallery/FoodGallery";
import About from "../../components/About/About";
import bg1 from "../../assets/bg1.jpg";
import Footer from "../../components/Footer/Footer";

function Home() {
	const [recipes, setRecipes] = useState<RecipeItem[]>([]);
	const buttons = ["Get Started", "Learn More"];
	const description =
		"Discover recipes, track ingredients with caloric info, and achieve your health goals with personalized BMI and daily caloric needs calculations. Create your perfect meal plan effortlessly with FoodApp.";

	useEffect(() => {
		const queries = ["salad", "pizza", "pasta", "grill", "dinner", "breakfast", "snack", "seafood", "chicken", "beef", "dessert"];
		const randomQuery = queries[Math.floor(Math.random() * queries.length)];
		if (recipes.length === 0) {
			recipeService.getRecipesByQuery(randomQuery).then((res) => {
				console.log("get recepies");
				setRecipes(res);
			});
		}
		return () => {
			setRecipes([]);
		};
	}, []);
	return (
		<section>
			<Header image={bg1} type="large" title="Welcome to FoodApp" description={description} buttons={buttons} />
			<FoodGallery title="Recepies you might like..." recipes={recipes} />
			<About />
			<Footer />
		</section>
	);
}

export default Home;
