/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks/hooks";
import AuthService from "../../utils/service/AuthService";
import { userCardClasses } from "./userCardClasses";
import { STATIC_IMAGES } from "../../utils/constants/images";

function UserCard() {
	const reduxUser = useAppSelector((state) => state.auth.user);
	const { container, flexColContainer, flexContainer, image, imageConainer, title } = userCardClasses;
	const dispatch = useDispatch();
	const authService = new AuthService(dispatch);
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
							<img className={image} src={reduxUser.picture || STATIC_IMAGES.USER} alt="user" />
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
