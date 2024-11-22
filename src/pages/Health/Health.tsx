import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu, GiKitchenScale } from "react-icons/gi";
import { RiBodyScanFill, RiLineChartFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";

function Health() {
	return (
		<div className="health__container">
			<header>
				<div>
					<div className="health__sidebar-header">
						<GiHamburgerMenu className="health__sidebar-icon" />
						<h2>Menu</h2>
					</div>
					<ul className="health__sidebar-list">
						<li>
							<Link to="bmi-calculator">
								<RiBodyScanFill className="health__sidebar-icon" />
								<p>BMI</p>
							</Link>
						</li>
						<li>
							<Link to="bmr-calculator">
								<GiKitchenScale className="health__sidebar-icon" />
								<p>BMR</p>
							</Link>
						</li>
						<li>
							<Link to="health-tracker">
								<RiLineChartFill className="health__sidebar-icon" />
								<p>Tracker</p>
							</Link>
						</li>
					</ul>
				</div>
				<div className="health__sidebar-footer">
					<Link to="/">
						<IoHomeOutline className="health__sidebar-icon" />
						<p>Home</p>
					</Link>
				</div>
			</header>
			<div className="health__content">
				<h1 className="text-6xl text-center">Health</h1>
				<Outlet />
			</div>
		</div>
	);
}

export default Health;
