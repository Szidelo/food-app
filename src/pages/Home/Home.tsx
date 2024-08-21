import { Link } from "react-router-dom";
import Card from "../../components/Card";

function Home() {
	return (
		<div>
			<h1>Home</h1>
			<Card />
			<br />
			<div>
				<Link to="/test-page">
					<button>Test Page</button>
				</Link>
				<Link to="/auth">
					<button>Authentication</button>
				</Link>
				<Link to="/db">
					<button>Data</button>
				</Link>
				<Link to="/bmi">
					<button>Bmi</button>
				</Link>
				<Link to="/user">
					<button>Edit User</button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
