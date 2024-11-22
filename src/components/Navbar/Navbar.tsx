import { Link, useLocation } from "react-router-dom";
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
import UserModal from "../UserModal/UserModal";

function Navbar() {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const authService = new AuthService(dispatch);
	const path = useLocation().pathname;
	const [isMobile, setIsMobile] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);
	const [isNavTrasnparent, setIsNavTrasparent] = useState(true);
	const [isHomePage, setIsHomePage] = useState(true);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
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

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 600) {
				setIsNavTrasparent(false);
			} else {
				setIsNavTrasparent(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (path === "/") {
			setIsHomePage(true);
		} else {
			setIsHomePage(false);
		}
	}, [path]);

	const navClasses = {
		home: `z-30 fixed w-full top-0 left-0 p-4 text-white flex items-center justify-between px-32 ${
			isNavTrasnparent ? "bg-black" : "bg-caribbean-current"
		}`,
		other: `z-30 fixed w-full top-0 left-0 p-4 text-white flex items-center justify-between px-32 bg-caribbean-current`,
	};
	const desktopNavBar = (
		<nav className={isHomePage ? navClasses.home : navClasses.other}>
			<UserModal isVisible={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} />
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
					<Link to="/favorites">Favorite Recipes</Link>
				</li>
				<li>
					<Link to="/health/bmi-calculator">Health</Link>
				</li>
			</ul>
			<div className="cursor-pointer" onClick={() => setIsUserModalOpen((prev) => !prev)}>
				<Card />
			</div>
		</nav>
	);

	const mobileNavBar = (
		<>
			<UserModal isVisible={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} />
			<nav className="bg-black text-white fixed inset-x-0 bottom-0 z-50 flex justify-between items-center px-4 py-2">
				<Link to="/" className="flex flex-col items-center w-full">
					<IoHomeOutline className="w-7 h-7 text-orange-wheel" />
				</Link>
				<Link to="/recipes" className="flex flex-col items-center w-full">
					<PiBowlFood className="w-7 h-7 text-orange-wheel" />
				</Link>
				<button onClick={() => setIsUserModalOpen((prev) => !prev)} className="relative flex flex-col items-center w-full">
					<div className="absolute -top-8">
						<div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden border-4 border-gray-800">
							<img src={user?.picture || userBackDrop} alt="user" className="w-full h-full object-cover" />
						</div>
					</div>
					<span className="text-sm mt-8 text-orange-wheel">{user?.name?.split(" ")[0]}</span>
				</button>
				<Link to="/health/bmi-calculator" className="flex flex-col items-center w-full">
					<LuLayoutDashboard className="w-7 h-7 text-orange-wheel" />
				</Link>
				<Link to="/" onClick={handleSignOut} className="flex flex-col items-center w-full">
					<MdLogout className="w-7 h-7 text-orange-wheel" />
				</Link>
			</nav>
		</>
	);

	return <>{isMobile ? mobileNavBar : desktopNavBar}</>;
}

export default Navbar;
