import React from "react";

type PropsType = {
	img: string;
	title: string;
	description: string;
	id: string;
};

function SmallCard(props: PropsType) {
	const { img, title, description } = props;
	return (
		<div className="rounded-lg lg:w-[346px] h-[340px] w-full lg:px-0 px-4 shadow-md mb-10">
			<div className="card-image-wrapper h-3/5 w-full bg-center">
				<img src={img} alt="background-image" />
			</div>
			<div className="p-4">
				<div className="h-6 overflow-hidden">
					<h2 className="text-xl font-extrabold">{title}</h2>
				</div>
				<p>{description}</p>
			</div>
			<div className="px-4 flex gap-4">
				<button className="btn btn-card">Save</button>
				<button className="btn btn-card">View Recipe</button>
			</div>
		</div>
	);
}

export default SmallCard;
