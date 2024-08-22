/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "../../redux/hooks/hooks";

function Card() {
	const reduxUser = useAppSelector((state) => state.auth.user);

	return (
		<div className="absolute top-2 right-2 w-60 bg-slate-400 rounded ms-auto py-2 px-6">
			{reduxUser ? (
				<div className="flex justify-between">
					<div className="flex flex-col justify-center">
						<h2 className="text-slate-800 font-extrabold text-xl">{reduxUser.name} </h2>
					</div>
					<div className="h-16 w-16 ">
						<img className="w-full h-full rounded-full object-cover" src={reduxUser.picture || undefined} alt="user" />
					</div>
				</div>
			) : (
				<p>No user</p>
			)}
		</div>
	);
}

export default Card;
