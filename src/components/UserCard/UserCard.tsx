/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks/hooks";
import AuthService from "../../utils/service/AuthService";
import { userCardClasses } from "./userCardClasses";

function UserCard() {
	const reduxUser = useAppSelector((state) => state.auth.user);
	const { container, flexColContainer, flexContainer, image, imageConainer, title } = userCardClasses;
	const dispatch = useDispatch();
	const authService = new AuthService(dispatch);
	const userBackDrop =
		"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

	const handleLogout = async () => {
		await authService.handleLogout();
	};

	return (
		<div className={container}>
			{reduxUser ? (
				<div className={flexContainer}>
					<div className={flexColContainer}>
						<h2 className={title}>Hi, {reduxUser.name}!</h2>
						<div className={imageConainer}>
							<img className={image} src={reduxUser.picture || userBackDrop} alt="user" />
						</div>
						<button onClick={handleLogout} className="btn btn-link rounded-full ms-6">
							Log Out
						</button>
					</div>
				</div>
			) : (
				<p>No user</p>
			)}
		</div>
	);
}

export default UserCard;
