import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import TestPage from "./pages/TestPage/TestPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="test-page" element={<TestPage />} />
			<Route path="auth" element={<Auth />} />
		</Routes>
	);
}

export default App;
