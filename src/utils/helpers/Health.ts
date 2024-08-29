export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "lose" | "maintain" | "gain";

class HealthCalculator {
	private static instance: HealthCalculator;

	private weight: number;
	private height: number;
	private age: number;
	private gender: Gender;
	private activityLevel: ActivityLevel;

	// singleton pattern
	public static getInstance(weight: number, height: number, age: number, gender: Gender, activityLevel: ActivityLevel): HealthCalculator {
		if (!HealthCalculator.instance) {
			HealthCalculator.instance = new HealthCalculator(weight, height, age, gender, activityLevel);
		} else {
			HealthCalculator.instance.weight = weight;
			HealthCalculator.instance.height = height;
			HealthCalculator.instance.age = age;
			HealthCalculator.instance.gender = gender;
			HealthCalculator.instance.activityLevel = activityLevel;
		}
		return HealthCalculator.instance;
	}

	private constructor(weight: number, height: number, age: number, gender: Gender, activityLevel: ActivityLevel) {
		this.weight = weight;
		this.height = height;
		this.age = age;
		this.gender = gender;
		this.activityLevel = activityLevel;
	}

	public calculateBMI(): number {
		return parseFloat((this.weight / (this.height / 100) ** 2).toFixed(2));
	}

	public classifyBMI(): string {
		const bmi = this.calculateBMI();
		if (bmi < 18.5) return "Underweight";
		if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
		if (bmi >= 25 && bmi < 29.9) return "Overweight";
		return "Obesity";
	}

	public calculateBMR(): number {
		const { weight, height, age, gender } = this;
		const bmr =
			gender === "male"
				? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
				: 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
		return parseFloat(bmr.toFixed(2));
	}

	public calculateCaloricNeeds(): number {
		const activityMultipliers: { [key in ActivityLevel]: number } = {
			sedentary: 1.2,
			light: 1.375,
			moderate: 1.55,
			active: 1.725,
			very_active: 1.9,
		};
		return parseFloat((this.calculateBMR() * activityMultipliers[this.activityLevel]).toFixed(2));
	}

	public calculateCaloriesForGoal(goal: Goal): number {
		const caloricNeeds = this.calculateCaloricNeeds();
		switch (goal) {
			case "lose":
				return caloricNeeds - 500;
			case "gain":
				return caloricNeeds + 500;
			case "maintain":
			default:
				return caloricNeeds;
		}
	}

	get data(): { weight: number; height: number; age: number; gender: Gender; activityLevel: ActivityLevel } {
		return {
			weight: this.weight,
			height: this.height,
			age: this.age,
			gender: this.gender,
			activityLevel: this.activityLevel,
		};
	}
}

export default HealthCalculator;
