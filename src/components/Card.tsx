/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useAppSelector } from "../redux/hooks/hooks";

function Card() {
	const user = useAppSelector((state) => state.auth.user);
	return <>{user ? <p>{user.email}</p> : <p>Not logged in</p>}</>;
}

export default Card;
