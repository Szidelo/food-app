import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Card from "../UserCard/UserCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { IoHomeOutline } from "react-icons/io5";
import { PiBowlFood } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import AuthService from "../../utils/service/AuthService";
import { useDispatch } from "react-redux";

function Navbar() {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const authService = new AuthService(dispatch);
	const [isMobile, setIsMobile] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);
	const userBackDrop =
		"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

	const handleMobile = (value: number) => {
		if (value < 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	const handleSignOut = async () => {
		await authService.handleLogout();
	};

	useEffect(() => {
		handleMobile(width);
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [width]);

	const desktopNavBar = (
		<nav className="z-30 fixed w-full top-0 left-0 bg-transparent bg-caribbean-current p-4 text-white flex items-center justify-between px-32">
			<div>
				<img className="w-24" src={logo} alt="logo" />
			</div>
			<ul className="flex space-x-4">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/recipes">Recipes</Link>
				</li>
				<li>
					<Link to="/test-page">Test Page</Link>
				</li>
				<li>
					<Link to="/db">DB Test Page</Link>
				</li>
				<li>
					<Link to="/bmi">BMI Test</Link>
				</li>
				<li>
					<Link to="/user">Edit User</Link>
				</li>
				<li>
					<Link to="/auth">Auth</Link>
				</li>
			</ul>
			<div>
				<Card />
			</div>
		</nav>
	);

	const mobileNavBar = (
		<nav className="bg-black text-white fixed inset-x-0 bottom-0 z-50 flex justify-between items-center px-4 py-2">
			<Link to="/" className="flex flex-col items-center w-full">
				<IoHomeOutline className="w-7 h-7 text-orange-wheel" />
				{/* <span className="text-xs">Home</span> */}
			</Link>
			<Link to="/recipes" className="flex flex-col items-center w-full">
				<PiBowlFood className="w-7 h-7 text-orange-wheel" />
				{/* <span className="text-xs">Test</span> */}
			</Link>
			<Link to="/db" className="relative flex flex-col items-center w-full">
				<div className="absolute -top-8">
					<div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden border-4 border-gray-800">
						<img src={user?.picture || userBackDrop} alt="user" className="w-full h-full object-cover" />
					</div>
				</div>
				<span className="text-sm mt-8 text-orange-wheel">{user?.name?.split(" ")[0]}</span>
			</Link>
			<Link to="/bmi" className="flex flex-col items-center w-full">
				<LuLayoutDashboard className="w-7 h-7 text-orange-wheel" />
				{/* <span className="text-xs">BMI</span> */}
			</Link>
			<Link to="/" onClick={handleSignOut} className="flex flex-col items-center w-full">
				<MdLogout className="w-7 h-7 text-orange-wheel" />
			</Link>
		</nav>
	);

	return <>{isMobile ? mobileNavBar : desktopNavBar}</>;
}

export default Navbar;
