import { useEffect, useState } from "react";
import { RecipeItem } from "../../utils/interfaces/providers/apiResponse";
import SmallCard from "../Cards/SmallCard";
import SmallCardSkeleton from "../Skeletons/SmallCardSkeleton";

interface Props {
	title: string;
	recipes: RecipeItem[];
	numberOfItems?: number;
}

function FoodGallery(props: Props) {
	const [loading, setLoading] = useState(true);
	const { title, recipes, numberOfItems = 8 } = props;

	useEffect(() => {
		if (recipes.length > 0) {
			setLoading(false);
		}
	}, [recipes]);

	const indexes: number[] = [];

	for (let i = 0; i < numberOfItems; i++) {
		indexes.push(i);
	}

	return (
		<div className="container-full relative">
			<div className="container mx-auto mt-24 pb-96 flex flex-col">
				<div className="mb-20">
					<h1 className="text-center font-extrabold text-4xl">{title}</h1>
				</div>
				<div className="flex flex-wrap justify-between">
					{loading && indexes.map((i) => <SmallCardSkeleton key={i} />)}
					{recipes &&
						recipes.map((recipe, index) => {
							const { uri, image, cuisineType, label } = recipe;
							return (
								index < numberOfItems && (
									<SmallCard recipe={recipe} key={uri} img={image} description={cuisineType[0]} id={uri} title={label} />
								)
							);
						})}
				</div>
			</div>
			<svg className="home__svg-header" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#d87d4aff"
					fill-opacity="1"
					d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,160C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
			</svg>
		</div>
	);
}

export default FoodGallery;
