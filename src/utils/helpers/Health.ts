import { BMI_CATEGORY } from "../constants/bmi";

class HealthCalculator {
	calculateBmi(weight: number, height: number): number {
		const heightInMeters = height / 100;
		const result = (weight / (heightInMeters * heightInMeters)).toFixed(2);
		return +result;
	}

	determineBmiCategory(bmi: number): string {
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
}

export const healthCalculator = new HealthCalculator();
