import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MenuSlider from "./components/MenuSlider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	useEffect(() => {
		Telegram.WebApp.BackButton.show();
	});
	return (
		<ProtectedRoute>
			<Outlet />
			<MenuSlider />
		</ProtectedRoute>
	);
};

export default App;
