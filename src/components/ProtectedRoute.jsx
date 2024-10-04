import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useSelector((state) => state.user);

	if (!isAuthenticated) {
		const location = useLocation();
		console.log(location);

		// Get the referral code from the URL if it exists
		const searchParams = new URLSearchParams(location.search);
		console.log(searchParams);
		const referralCode = 5446;
		if (referralCode) {
			console.log(location);
		}
	}

	// If the user is authenticated, render the children components (protected content)
	return children;
};

export default ProtectedRoute;
