import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RecipeBrowse from "../../components/RecipeBrowse/RecipeBrowse";
import SavedRecipes from "../../components/SavedRecipes/SavedRecipes";

interface FoodProps {
	page: "recipes" | "food" | "favourites";
}

function Food(props: FoodProps) {
	const { page } = props;
	return (
		<section className="food__main">
			<Header type="small" title="" buttons={[]} />
			{page === "recipes" && <RecipeBrowse />}
			{page === "favourites" && <SavedRecipes />}
			<Footer />
		</section>
	);
}

export default Food;
