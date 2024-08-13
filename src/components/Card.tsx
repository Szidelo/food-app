/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "../redux/hooks/hooks";

function Card() {
	const reduxUser = useAppSelector((state) => state.auth.user);

	return (
		<div className="user-card">
			{reduxUser ? (
				<div className="card-info">
					<div>
						<h2>Hello {reduxUser.name}</h2>
						<p>{reduxUser.email}</p>
					</div>
					<div className="card-img">
						<img src={reduxUser.picture || undefined} alt="user" />
					</div>
				</div>
			) : (
				<p>No user</p>
			)}
		</div>
	);
}

export default Card;
