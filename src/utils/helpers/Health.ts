import { BMI_CATEGORY, GENDER } from "../constants/bmi";

export type Gender = "male" | "female";

class HealthCalculator {
	public calculateBmi(weight: number, height: number): number {
		const heightInMeters = height / 100;
		const bmi = weight / (heightInMeters * heightInMeters);
		return parseFloat(bmi.toFixed(2));
	}

	public classifyBMI(bmi: number): string {
		switch (true) {
			case bmi <= 18.5:
				return BMI_CATEGORY.UNDERWEIGHT;
			case bmi <= 24.9:
				return BMI_CATEGORY.NORMAL_WEIGHT;
			case bmi <= 29.9:
				return BMI_CATEGORY.OVERWEIGHT;
			case bmi <= 34.9:
				return BMI_CATEGORY.OBESITY_CLASS_1;
			case bmi <= 39.9:
				return BMI_CATEGORY.OBESITY_CLASS_2;
			default:
				return BMI_CATEGORY.OBESITY_CLASS_3;
		}
	}

	public calculateBmr(weight: number, height: number, age: number, gender: Gender) {
		let bmr: number;

		if (gender === GENDER.MALE) {
			bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
		} else {
			bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
		}

		return parseFloat(bmr.toFixed(2));
	}
}

export const healthCalculator = new HealthCalculator();
