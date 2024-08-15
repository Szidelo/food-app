import { useState } from "react";
import { healthCalculator } from "../../utils/helpers/Health";

function TestBmi() {
	const [bmi, setBmi] = useState<number | null>(null);
	const [bmiCat, setBmiCat] = useState<string>("");
	const [height, setHeight] = useState<string>("");
	const [weight, setWeight] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "height") {
			setHeight(value);
		} else if (name === "weight") {
			setWeight(value);
		}
	};

	const handleBmi = (height: string, weight: string) => {
		const bmi = healthCalculator.calculateBmi(+weight, +height);
		const bmiCategory = healthCalculator.determineBmiCategory(bmi);
		setBmi(bmi);
		setBmiCat(bmiCategory);
	};

	return (
		<div>
			<div>
				<h1>BMI Calculator</h1>
				<p>Enter your weight and height to calculate your BMI</p>
				<input type="number" placeholder="Enter your weight in kg" name="weight" onChange={handleChange} value={weight} />
				<input type="number" placeholder="Enter your height in cm" name="height" onChange={handleChange} value={height} />
				<button onClick={() => handleBmi(height, weight)}>Calculate</button>
			</div>
			<div>
				<h2>Your BMI is: </h2>
				<p>Your bmi is: {bmi}</p>
				<p>You are: {bmiCat}</p>
			</div>
			<div>
				<h1>BMR Calculator</h1>
			</div>
		</div>
	);
}

export default TestBmi;
