import React from "react";
import { Outlet } from "react-router-dom";
import MenuSlider from "./components/MenuSlider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	return (
		<ProtectedRoute>
			<Outlet />
			<MenuSlider />
		</ProtectedRoute>
	);
};

export default App;
