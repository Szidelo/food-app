import { Link } from "react-router-dom";
import Card from "../../components/Card";

function Home() {
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
