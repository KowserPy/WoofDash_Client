import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const referralCode = queryParams.get("tgWebAppStartParam");

	const { token } = useSelector((state) => state.auth);
	// If user is not logged in, redirect to /startapp
	if (!token) {
		// If referral code exists, append it to the redirect URL
		const redirectURL = referralCode ? `/startapp?startapp=${referralCode}` : "/startapp";

		return <Navigate to={redirectURL} />;
	}
	return children;
};

export default ProtectedRoute;
