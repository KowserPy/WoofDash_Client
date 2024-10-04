import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useSelector((state) => state.user);
	const location = useLocation();
	console.log(location);

	// Get the referral code from the URL if it exists
	const searchParams = new URLSearchParams(location.search);
	console.log(searchParams);
	const referralCode = searchParams.get("ref");

	if (!isAuthenticated) {
		// If the user is not authenticated and there's a referral code, redirect with the referral code
		if (referralCode) {
			return <Navigate to={`/startapp?ref=${referralCode}`} />;
		} else {
			// Otherwise, redirect to /startapp without the code
			return <Navigate to="/startapp" />;
		}
	}

	// If the user is authenticated, render the children components (protected content)
	return children;
};

export default ProtectedRoute;
