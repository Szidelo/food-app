import { GiHamburgerMenu, GiKitchenScale } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { RiBodyScanFill, RiLineChartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const gapCustomStyle = { gap: isOpen ? "16px" : "0px" };

	return (
		<header style={{ width: isOpen ? "180px" : "80px" }}>
			<div>
				<div onClick={toggleSidebar} style={gapCustomStyle} className="health__sidebar-header">
					<GiHamburgerMenu className="health__sidebar-icon" />
					{isOpen && <p>Menu</p>}
				</div>
				<ul className="health__sidebar-list">
					<li>
						<Link style={gapCustomStyle} to="bmi-calculator">
							<RiBodyScanFill className="health__sidebar-icon" />
							{isOpen && <p>BMI</p>}
						</Link>
					</li>
					<li>
						<Link style={gapCustomStyle} to="bmr-calculator">
							<GiKitchenScale className="health__sidebar-icon" />
							{isOpen && <p>BMR</p>}
						</Link>
					</li>
					<li>
						<Link style={gapCustomStyle} to="health-tracker">
							<RiLineChartFill className="health__sidebar-icon" />
							{isOpen && <p>Tracker</p>}
						</Link>
					</li>
				</ul>
			</div>
			<div className="health__sidebar-footer">
				<Link style={gapCustomStyle} to="/">
					<IoHomeOutline className="health__sidebar-icon" />
					{isOpen && <p>Home</p>}
				</Link>
			</div>
		</header>
	);
}

export default Sidebar;
