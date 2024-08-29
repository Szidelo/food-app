import { useState } from "react";
import img1 from "../../assets/img_1.png";
import img2 from "../../assets/img_2.png";
import img3 from "../../assets/img_3.png";

type DataType = {
	title: string;
	summary: string;
	img: string;
	buttonText: string;
};

const DATA: DataType[] = [
	{
		title: "Calculate Your BMI",
		summary:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolorum quasi dolore ab ex soluta rem omnis repellendus labore aut perspiciatis consequuntur nesciunt, repudiandae, eaque distinctio odit cupiditate vitae eius.",
		img: img1,
		buttonText: "Find your BMI",
	},
	{
		title: "Find Your Daily Caloric Needs",
		summary:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolorum quasi dolore ab ex soluta rem omnis repellendus labore aut perspiciatis consequuntur nesciunt, repudiandae, eaque distinctio odit cupiditate vitae eius.",
		img: img2,
		buttonText: "Track Calories",
	},
	{
		title: "Create A Meal Plan",
		summary:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolorum quasi dolore ab ex soluta rem omnis repellendus labore aut perspiciatis consequuntur nesciunt, repudiandae, eaque distinctio odit cupiditate vitae eius.",
		img: img3,
		buttonText: "Plan Meals",
	},
];

function About() {
	const [activeBullet, setActiveBullet] = useState(0);
	const { img, summary, title, buttonText } = DATA[activeBullet];

	const handleBulletClick = (index: number) => {
		setActiveBullet(index);
	};

	const indexes: number[] = DATA.map((item) => DATA.indexOf(item));

	return (
		<div className="container-full relative bg-orange-wheel text-white pb-28">
			<div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
				<div className="w-full md:w-1/2 h-full relative">
					<div className="about__backdrop"></div>
					<div className="about__image-wrapper">
						<img src={img} alt="" />
					</div>
				</div>
				<div className="w-full md:w-1/2 h-full pt-12 flex flex-col justify-start items-start">
					<div className="mb-auto w-full">
						<h1 className="text-8xl font-extrabold pb-12 capitalize">{title}</h1>
						<p>{summary}</p>
						<button className="btn btn-dark rounded-full mt-12 md:mx-0 mx-auto">{buttonText}</button>
					</div>
				</div>
			</div>
			<div className="h-20 mx-auto flex justify-center items-center space-x-6">
				{indexes.map((index) => (
					<div key={index} className="w-7 h-7 flex justify-center items-center">
						<div className={`bullet ${activeBullet === index ? "active" : ""}`} onClick={() => handleBulletClick(index)}></div>
					</div>
				))}
			</div>
		</div>
	);
}

export default About;
