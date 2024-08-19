import { useState } from "react";
import { Gender, healthCalculator } from "../../utils/helpers/Health";
import { GENDER } from "../../utils/constants/bmi";

function TestBmi() {
	const [bmi, setBmi] = useState<number | null>(null);
	const [bmr, setBmr] = useState<number | null>(null);
	const [bmiCat, setBmiCat] = useState<string>("");
	const [height, setHeight] = useState<string>("");
	const [weight, setWeight] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [gender, setGender] = useState<Gender>("male");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "height") {
			setHeight(value);
		} else if (name === "weight") {
			setWeight(value);
		} else if (name === "age") {
			setAge(value);
		}
	};

	const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setGender(e.target.value as Gender);
	};

	const handleBmi = (height: string, weight: string) => {
		const bmi = healthCalculator.calculateBmi(+weight, +height);
		const bmiCategory = healthCalculator.classifyBMI(bmi);
		setBmi(bmi);
		setBmiCat(bmiCategory);
	};

	const handleBmr = () => {
		const result = healthCalculator.calculateBmr(+weight, +height, +age, gender);
		setBmr(result);
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
				<p>Enter your weight, height, age and gender to calculate your BMR</p>
				<input type="number" placeholder="Enter your weight in kg" name="weight" onChange={handleChange} value={weight} />
				<input type="number" placeholder="Enter your height in cm" name="height" onChange={handleChange} value={height} />
				<input type="number" placeholder="Enter your age" name="age" onChange={handleChange} value={age} />
				<select onChange={handleGender}>
					<option value={"choose gender"}>Choose Gender</option>
					<option value={GENDER.MALE}>Male</option>
					<option value={GENDER.FEMALE}>Female</option>
				</select>
				<button onClick={handleBmr}>Calculate</button>
			</div>
			<div>
				<h3>Your bmr is: {bmr}</h3>
			</div>
		</div>
	);
}

export default TestBmi;
