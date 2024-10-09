import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { getProfile } from "../features/userSlice"; // Import your getProfile action
import woofImg from "../assets/woof.png";
import formatNumber from "../utils/formatNumber";

const Profile = () => {
	const dispatch = useDispatch(); // Initialize dispatch
	const { user, isLoading, isError, message } = useSelector((state) => state.user); // Assuming these values come from user slice

	// Fetch profile data on component load
	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]); // Dispatch getProfile on component mount

	// Safely access profile data
	const totalPoints = user?.points?.totalPoints || 0;
	const taskPoints = user?.points?.taskPoints || 0;
	const referralPoints = user?.points?.referralPoints || 0;

	return (
		<div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-5 rounded-lg shadow-lg w-full max-w-md">
			<div className="flex flex-col items-center mb-6">
				<img src={woofImg} alt="woofImg" className="w-2/5" />
				<span className="text-3xl font-bold">+{formatNumber(totalPoints)} WOOF</span>
			</div>
			<div className="space-y-4">
				<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
					<span className="font-semibold">Task</span>
					<div className="flex items-center gap-2">
						<span>+{formatNumber(taskPoints)} WOOF</span>
						<img src={woofImg} alt="Task Icon" className="w-6 h-6" />
					</div>
				</div>
				<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
					<span className="font-semibold">Invites</span>
					<div className="flex items-center gap-2">
						<span>+{formatNumber(referralPoints)} WOOF</span>
						<img src={woofImg} alt="Invite Icon" className="w-6 h-6" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
