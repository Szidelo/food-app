/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "../../redux/hooks/hooks";
import { userCardClasses } from "./userCardClasses";

function Card() {
	const reduxUser = useAppSelector((state) => state.auth.user);
	const { container, flexColContainer, flexContainer, image, imageConainer, title } = userCardClasses;

	return (
		<div className={container}>
			{reduxUser ? (
				<div className={flexContainer}>
					<div className={flexColContainer}>
						<h2 className={title}>{reduxUser.name} </h2>
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
