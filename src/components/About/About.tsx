import { useState } from "react";
import img1 from "../../assets/img_1.png";
import img2 from "../../assets/img_2.png";
import img3 from "../../assets/img_3.png";
import { aboutClasses } from "./aboutClasses";

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
	const { bulletsStyle, buttonStyle, containerStyle, contentStyle, imageContentStyle, mainStyle, titleStyle } = aboutClasses;
	const [activeBullet, setActiveBullet] = useState(0);
	const { img, summary, title, buttonText } = DATA[activeBullet];

	const handleBulletClick = (index: number) => {
		setActiveBullet(index);
	};

	const indexes: number[] = DATA.map((item) => DATA.indexOf(item));

	return (
		<div className={mainStyle}>
			<div className={containerStyle}>
				<div className={imageContentStyle}>
					<div className="about__backdrop"></div>
					<div className="about__image-wrapper">
						<img src={img} alt="" />
					</div>
				</div>
				<div className={contentStyle}>
					<div className="mb-auto w-full">
						<h1 className={titleStyle}>{title}</h1>
						<p>{summary}</p>
						<button className={buttonStyle}>{buttonText}</button>
					</div>
				</div>
			</div>
			<div className={bulletsStyle}>
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
