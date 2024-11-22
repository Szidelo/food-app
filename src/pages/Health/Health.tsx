import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

function Health() {
	return (
		<div className="health__container">
			<Sidebar />
			<div className="health__content">
				<h1 className="text-6xl text-center"></h1>
				<Outlet />
			</div>
		</div>
	);
}

export default Health;
