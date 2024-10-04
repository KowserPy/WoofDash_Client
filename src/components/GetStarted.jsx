import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createUser } from "../features/userSlice";

const GetStarted = () => {
	const location = useLocation();
	const [isLoggedInTg, setLoggedInTg] = useState(false);
	const [userData, setUserData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isAuthenticated } = useSelector((state) => state.user);

	// Redirect to home if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/"); // Redirect to home page if user is already authenticated
		}
	}, [isAuthenticated, navigate]);

	// Initialize Telegram WebApp data
	useEffect(() => {
		if (window.Telegram.WebApp.initData !== "") {
			setLoggedInTg(true);
			setUserData({
				initData: window.Telegram.WebApp.initData,
			});
		} else {
			setLoggedInTg(false);
		}
	}, []);

	// Handle sending data with the referral code
	const handleSendData = async () => {
		const queryParams = new URLSearchParams(location.search);
		const referralCode = queryParams.get("startapp");
		console.log(referralCode);
		// Merge referralCode into userData
		const updatedUserData = {
			...userData,
			referralCode: referralCode || null,
		};
		setUserData(updatedUserData);
		if (isLoggedInTg && updatedUserData) {
			try {
				// Dispatch the updated user data to the backend
				await dispatch(createUser(updatedUserData));
				navigate("/"); // Redirect to the home page after successful login or signup
			} catch (error) {
				console.error("Error logging in:", error);
			}
		}
	};

	return (
		<div className="w-full mx-auto h-screen bg-gradient-to-r from-blue-200 to-cyan-200 flex items-center justify-center flex-col">
			{isLoggedInTg ? (
				<div>
					<div className="text-center mb-6">
						<h1 className="text-5xl py-2 font-bold italic">Woof Dash</h1>
						<p>Play more, earn more</p>
					</div>
					<button
						onClick={handleSendData}
						className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded"
					>
						Get Started
					</button>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-screen">
					<p className="text-xl">Please Login to Telegram.</p>
					<a
						href="https://web.telegram.org/a/"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-blue-500 text-white px-4 py-2 rounded inline-block mt-4"
					>
						Login
					</a>
				</div>
			)}
		</div>
	);
};

export default GetStarted;
