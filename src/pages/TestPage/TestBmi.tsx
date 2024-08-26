import { useState } from "react";
import { HealthData } from "../../utils/interfaces/items/itemsInterfaces";
import { firestoreService } from "../../utils/service/Firestore";
import { useAppSelector } from "../../redux/hooks/hooks";

function TestBmi() {
	const [healthData, setHealthData] = useState<HealthData | null>(null);
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const user = useAppSelector((state) => state.auth.user);

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		setIsSaved(false);
		e.preventDefault();
		const weight = parseFloat(e.currentTarget.weight.value);
		const height = parseFloat(e.currentTarget.height.value);
		const age = parseFloat(e.currentTarget.age.value);
		const gender = e.currentTarget.gender.value;
		const activityLevel = e.currentTarget.activity.value;

		const newHealthData = {
			weight,
			height,
			age,
			gender,
			activityLevel,
		};

		setHealthData(newHealthData);

		if (user) {
			await firestoreService.saveUpdatedHealthDataToDb(user, newHealthData);

			setIsSaved(true);
		}
	};

	const handleCheck = () => {
		if (healthData)
			firestoreService.getHealthDataUpdates(user).then((res) => {
				console.log(res?.docs.map((doc) => doc.data()));
			});
	};

	return (
		<div className="health__container mt-56">
			<h2>Please provide info</h2>
			<form onSubmit={handleSave} className="health__form">
				<div className="form-top">
					<div className="form-control-sm">
						<label htmlFor="weight">Weight</label>
						<input type="number" name="weight" placeholder="weight in kg..." />
					</div>
					<div className="form-control-sm">
						<label htmlFor="height">Height</label>
						<input type="number" name="height" placeholder="height in cm..." />
					</div>
					<div className="form-control-sm">
						<label htmlFor="age">Age</label>
						<input type="number" name="age" placeholder="age..." />
					</div>
				</div>
				<div className="form-select">
					<div className="form-control-md">
						<select name="gender">
							<option value="">Choose gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					<div className="form-control-md">
						<select name="activity">
							<option value="">Choose activity level</option>
							<option value="sedentary">Sedentary</option>
							<option value="light">Light</option>
							<option value="moderate">Moderate</option>
							<option value="active">Active</option>
							<option value="very_active">Very active</option>
						</select>
					</div>
				</div>
				<div>
					<button type="submit">Save</button>
				</div>
			</form>

			{isSaved && <p>Health data saved successfully</p>}

			<button onClick={handleCheck}>Check Saved Data</button>
		</div>
	);
}

export default TestBmi;
