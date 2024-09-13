import Header from "../../components/Header/Header";
import RecipeBrowse from "../../components/RecipeBrowse/RecipeBrowse";

function Food() {
	return (
		<section className="food__main">
			<Header type="food" title="Food" buttons={[]} />
			<RecipeBrowse />
		</section>
	);
}

export default Food;
