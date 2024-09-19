import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";

function HeaderCard(props: RecipeItem) {
	const { image, label, cuisineType, dishType, url, calories, totalNutrients, yield: servings } = props;
	return (
		<div className="flex bg-orange-wheel rounded-lg shadow-md p-4 mb-5">
			<div className="w-[300px] h-[300px]">
				<img className="rounded-lg shadow-lg w-full h-[300px] object-cover" src={image} alt="" />
			</div>
			<div className="flex flex-col h-[300px] ps-8">
				<h1 className="text-4xl font-bold text-start mb-6">{label}</h1>
				<div className="flex h-full w-full space-x-7">
					<div className="flex flex-col justify-between">
						<div className="flex flex-col w-[300px]">
							<div className="w-full flex justify-between items-center">
								<p className="text-start capitalize">Cousine Type: </p>
								<span className="capitalize font-extrabold text-lg">{cuisineType[0]}</span>
							</div>
							<div className="w-full flex justify-between items-center">
								<p className="text-start capitalize">Dish Type: </p>
								<span className="capitalize font-extrabold text-lg">
									{dishType === undefined ? "unknown" : dishType[0]}
								</span>
							</div>
							<div className="w-full flex justify-between items-center">
								<p className="text-start capitalize">Kcal:</p>
								<span className="capitalize font-extrabold text-lg">
									{(+calories.toFixed() / servings).toFixed()}/serving
								</span>
							</div>
							<div className="w-full flex justify-between items-center">
								<p className="text-start capitalize">servings:</p>
								<span className="capitalize font-extrabold text-lg">{servings}</span>
							</div>
						</div>
						<a className="mt-auto" href={url} target="_blank" rel="noreferrer">
							<button className="btn btn-text-action-secundary">View Recipe</button>
						</a>
					</div>
					<div className="h-full bg-black w-[1px]"></div>
					<div className="flex flex-col w-[300px]">
						<div className="w-full flex justify-between items-center">
							<p className="text-start capitalize">protein: </p>
							<span className="capitalize font-extrabold text-lg">{totalNutrients.PROCNT.quantity.toFixed()}g</span>
						</div>
						<div className="w-full flex justify-between items-center">
							<p className="text-start capitalize">fat: </p>
							<span className="capitalize font-extrabold text-lg">{totalNutrients.FAT.quantity.toFixed()}g</span>
						</div>
						<div className="w-full flex justify-between items-center">
							<p className="text-start capitalize">carbs: </p>
							<span className="capitalize font-extrabold text-lg">{totalNutrients.CHOCDF.quantity.toFixed()}g</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeaderCard;
