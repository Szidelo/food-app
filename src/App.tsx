import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import TestPage from "./pages/TestPage/TestPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthService from "./utils/service/AuthService";
import { useAppSelector } from "./redux/hooks/hooks";
import DbTestPage from "./pages/TestPage/DbTestPage";
import TestBmi from "./pages/TestPage/TestBmi";
import EditUser from "./pages/Auth/EditUser";
import Navbar from "./components/Navbar/Navbar";
import Food from "./pages/Food/Food";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import { firestoreService } from "./utils/service/Firestore";
import { helpers } from "./utils/helpers/functions";
import { addFavorite } from "./redux/slices/favoriteSlice";
import { RecipeItem } from "./utils/interfaces/providers/apiResponse";

function App() {
	const dispatch = useDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const authServ = new AuthService(dispatch);

	const [favorites, setFavorites] = useState<RecipeItem[]>([]);

	useEffect(() => {
		authServ.handleAuthStateChange(user);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (user) {
			firestoreService.getRecipesFromDb(user).then((res) => {
				helpers.setRecipesFromDb(res, setFavorites);
			});
		}
	}, [user]);

	favorites.forEach((item) => {
		dispatch(addFavorite(item));
	});

	return (
		<>
			{user && <Navbar />}
			{!user ? (
				<Auth />
			) : (
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="recipes" element={<Food />} />
					<Route path="recipes/:id" element={<RecipeDetails />} />
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
