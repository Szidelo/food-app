/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks/hooks";
import AuthService from "../../utils/service/AuthService";
import { userCardClasses } from "./userCardClasses";

function Card() {
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
						<h2 className={title}>{reduxUser.name} </h2>
						<button onClick={handleLogout} className="btn">
							Log Out
						</button>
					</div>
					<div className={imageConainer}>
						<img className={image} src={reduxUser.picture || undefined} alt="user" />
					</div>
				</div>
			) : (
				<p>No user</p>
			)}
		</div>
	);
}

export default Card;
