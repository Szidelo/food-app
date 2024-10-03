import React from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useDispatch } from "react-redux";
import AuthService from "../../utils/service/AuthService";
import { UserData } from "../../utils/interfaces/items/itemsInterfaces";

function EditUser() {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (user) {
			console.log(e.currentTarget.image.value);
			const image = e.currentTarget.image.value as string;
			const updatedUser = { photoURL: image, email: user.email, displayName: user.name, id: user.id } as UserData;
			const authServ = new AuthService(dispatch);
			await authServ.updateUserData(updatedUser);
		}
	};

	return (
		<div className="mt-20">
			<h1>edit user</h1>
			<form onSubmit={handleFormSubmit}>
				<input className="p-4 shadow-lg" type="text" name="image" placeholder="Picture URL" />
				<button>Save</button>
			</form>
		</div>
	);
}

export default EditUser;
