import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useEffect } from "react";
import { auth } from "../../firebase/Firebase";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		const userAuth = auth;
		userAuth.onAuthStateChanged((user) => {
			if (user) {
				dispatch(login({ email: user.email || "", password: "" }));
				console.log("user state", user);
			} else {
				console.log("no user");
			}
		});
	}, [dispatch]);

	return (
		<div>
			<h1>Home</h1>
			<Card />
			<div>
				<Link to="/test-page">
					<button>Test Page</button>
				</Link>
				<Link to="/auth">
					<button>Authentication</button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
