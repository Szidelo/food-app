import { firestoreService } from "../../utils/service/Firestore";
import { useAppSelector } from "../../redux/hooks/hooks";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";

type PropsType = {
	img: string;
	title: string;
	description: string;
	id: string;
	recipe: RecipeItem;
};

function SmallCard(props: PropsType) {
	const user = useAppSelector((state) => state.auth.user);

	const handleSaveRecipe = async (recipe: RecipeItem) => {
		if (user !== null) await firestoreService.addRecipeToDb(recipe, user);
	};

	const { img, title, description, recipe } = props;
	return (
		<div className="rounded-lg lg:w-[346px] h-[340px] w-full lg:px-0 px-4 shadow-md mb-10">
			<div className="card-image-wrapper h-3/5 w-full bg-center cursor-pointer">
				<img loading="lazy" src={img} alt="background-image" />
			</div>
			<div className="p-4">
				<div className="h-8 overflow-hidden">
					<h2 className="text-xl font-extrabold">{title}</h2>
				</div>
				<p className="capitalize text-grey-dark">{description}</p>
			</div>
			<div className="px-4 flex gap-4">
				<button onClick={() => handleSaveRecipe(recipe)} className="btn btn-card">
					Save
				</button>
				<button className="btn btn-card">View Recipe</button>
			</div>
		</div>
	);
}

export default SmallCard;
