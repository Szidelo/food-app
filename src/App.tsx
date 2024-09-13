import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import TestPage from "./pages/TestPage/TestPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from "./utils/service/AuthService";
import { useAppSelector } from "./redux/hooks/hooks";
import DbTestPage from "./pages/TestPage/DbTestPage";
import TestBmi from "./pages/TestPage/TestBmi";
import EditUser from "./pages/Auth/EditUser";
import Navbar from "./components/Navbar/Navbar";
import Food from "./pages/Food/Food";

function App() {
	const dispatch = useDispatch();
	const currentUser = useAppSelector((state) => state.auth.user);
	const user = useAppSelector((state) => state.auth.user);
	const authServ = new AuthService(dispatch);

	useEffect(() => {
		authServ.handleAuthStateChange(currentUser);
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{user && <Navbar />}
			{!user ? (
				<Auth />
			) : (
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="food" element={<Food />} />
					<Route path="test-page" element={<TestPage />} />
					<Route path="auth" element={<Auth />} />
					<Route path="db" element={<DbTestPage />} />
					<Route path="bmi" element={<TestBmi />} />
					<Route path="user" element={<EditUser />} />
				</Routes>
			)}
		</>
	);
}

export default App;
