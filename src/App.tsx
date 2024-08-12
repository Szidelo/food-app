import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import TestPage from "./pages/TestPage/TestPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from "./utils/service/AuthService";
import { useAppSelector } from "./redux/hooks/hooks";

function App() {
	const dispatch = useDispatch();
	const currentUser = useAppSelector((state) => state.auth.user);
	const authServ = new AuthService(dispatch);
	useEffect(() => {
		authServ.handleAuthStateChange(currentUser);
		// eslint-disable-next-line
	}, []);

	const userProfile = authServ.getUserProfile();
	console.log("userProfile", userProfile);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="test-page" element={<TestPage />} />
			<Route path="auth" element={<Auth />} />
		</Routes>
	);
}

export default App;
