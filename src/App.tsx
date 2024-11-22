import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./redux/hooks/hooks";
import { addFavorite } from "./redux/slices/favoriteSlice";
import { firestoreService } from "./utils/service/Firestore";
import { helpers } from "./utils/helpers/functions";
import { RecipeItem } from "./utils/interfaces/providers/apiResponse";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import TestPage from "./pages/TestPage/TestPage";
import AuthService from "./utils/service/AuthService";
import DbTestPage from "./pages/TestPage/DbTestPage";
import TestBmi from "./pages/TestPage/TestBmi";
import EditUser from "./pages/Auth/EditUser";
import Navbar from "./components/Navbar/Navbar";
import Food from "./pages/Food/Food";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import Health from "./pages/Health/Health";
import BmiCalculator from "./pages/BmiCalculator/BmiCalculator";
import BmrCalculator from "./pages/BmrCalculator/BmrCalculator";
import HealthTracker from "./pages/HealthTracker/HealthTracker";

function App() {
	const dispatch = useDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const [favorites, setFavorites] = useState<RecipeItem[]>([]);

	useEffect(() => {
		const authServ = new AuthService(dispatch);
		authServ.handleAuthStateChange();
	}, [dispatch]);

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
					<Route path="recipes" element={<Food page="recipes" />} />
					<Route path="favorites" element={<Food page="favourites" />} />
					<Route path="recipes/:id" element={<RecipeDetails />} />
					<Route path="health" element={<Health />}>
						<Route path="bmi-calculator" element={<BmiCalculator />} />
						<Route path="bmr-calculator" element={<BmrCalculator />} />
						<Route path="health-tracker" element={<HealthTracker />} />
					</Route>
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
