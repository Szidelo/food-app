/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from "react-redux";
import AuthService from "../utils/service/AuthService";

function Card() {
	const dispatch = useDispatch();
	const user = new AuthService(dispatch).getUserProfile();
	console.log("user saved in redux:", user);
	return (
		<div className="user-card">
			{user ? (
				<div className="card-info">
					<div>
						<h2>Hello {user.displayName}</h2>
						<p>{user.email}</p>
					</div>
					<div className="card-img">
						<img src={user.photoURL || undefined} alt="user" />
					</div>
				</div>
			) : (
				<p>No user</p>
			)}
		</div>
	);
}

export default Card;
