import { Link, Outlet } from "react-router-dom";

function Health() {
	return (
		<div className="health__container">
			<header className="health__sidebar">
				<div>
					<h2>Health Menu</h2>
					<ul className="health__sidebar-list">
						<li className="health__sidebar-item">
							<Link to="bmi">BMI</Link>
						</li>
						<li className="health__sidebar-item">
							<Link to="bmr">BMR</Link>
						</li>
						<li className="health__sidebar-item">
							<Link to="health-tracker">Health Tracker</Link>
						</li>
					</ul>
				</div>
				<div>
					<Link to="/">Home</Link>
				</div>
			</header>
			<div>
				<h1 className="text-6xl text-center">Health</h1>
				<Outlet />
			</div>
		</div>
	);
}

export default Health;
