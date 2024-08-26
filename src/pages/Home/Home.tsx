import Header from "../../components/Header/Header";

function Home() {
	const buttons = ["Get Started", "Learn More"];
	const description =
		"Discover recipes, track ingredients with caloric info, and achieve your health goals with personalized BMI and daily caloric needs calculations. Create your perfect meal plan effortlessly with FoodApp.";
	return (
		<div className="home__main">
			<Header type="home" title="Welcome to FoodApp" description={description} buttons={buttons} />
		</div>
	);
}

export default Home;
