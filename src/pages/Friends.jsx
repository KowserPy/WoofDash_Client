import React, { useState, useEffect } from "react";
import woofImg from "../assets/woof.png";
import { FaCopy } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getFriendsList } from "../features/userSlice";

const Friends = () => {
	const dispatch = useDispatch();
	const [notificationVisible, setNotificationVisible] = useState(false);
	const { user, friends, isLoading, isError, message } = useSelector((state) => state.user);
	const handleInviteClick = () => {
		// Handle invite click logic here
		alert("Invite sent!");
	};
	// Fetch friends list when component mounts
	useEffect(() => {
		console.log("called");
		dispatch(getFriendsList());
	}, [dispatch]);

	const handleCopyLinkClick = () => {
		const myReferralCode = user?.referralCode;
		const url = `https://t.me/WoofDash_bot/start?startapp=${myReferralCode}`;

		// Try to use the Clipboard API first
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(url)
				.then(() => {
					console.log("URL copied to clipboard using Clipboard API");
					setNotificationVisible(true);
					setTimeout(() => setNotificationVisible(false), 2000); // Hide after 2 seconds
				})
				.catch((err) => {
					copyTextFallback(url); // Fallback if Clipboard API fails
				});
		} else {
			copyTextFallback(url); // Fallback if Clipboard API is not available
		}
	};

	// Fallback function to copy text by creating a temporary text area
	const copyTextFallback = (text) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;

		// Avoid scrolling to bottom of the page
		textArea.style.position = "fixed";
		textArea.style.left = "-99999px"; // Move out of view
		document.body.appendChild(textArea);

		textArea.focus();
		textArea.select();

		try {
			// Attempt to copy the text by using the selection
			const successful = document.execCommand("copy");
			if (successful) {
				setNotificationVisible(true);
				setTimeout(() => setNotificationVisible(false), 2000);
			}
		} catch (err) {
			console.error("Fallback: Unable to copy text");
		}

		// Remove the temporary text area after copy
		document.body.removeChild(textArea);
	};

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center p-5 gap-5 h-[calc(100vh-4rem)] hide-scrollbar overflow-y-scroll space-y-6 pb-20 relative">
			<div className="flex justify-center items-center max-w-md w-full mx-auto flex-col">
				<img src={woofImg} className="w-1/3" alt="WOOF" />
				<p className="text-2xl text-center font-semibold">Invite frens</p>
				<p className="text-2xl text-center font-semibold">and get more WOOF</p>
			</div>
			<div className="bg-white rounded-md shadow-md p-5 mt-6 max-w-md w-full mx-auto">
				<div className="flex items-center gap-2 mb-4">
					<img src={woofImg} className="w-1/6" alt="WOOF" />
					<div>
						<h4 className="font-semibold text-lg">Invite a friend</h4>
						<p className="text-sm text-gray-600">+1000 to you and +500 to your friend</p>
					</div>
				</div>
				<div className="flex items-center gap-2 mb-6">
					<img src={woofImg} className="w-1/6" alt="WOOF" />
					<div>
						<h4 className="font-semibold text-lg">Invite a friend with Premium</h4>
						<p className="text-sm text-gray-600">+3000 to you and +1000 to your friend</p>
					</div>
				</div>
				{/* Buttons */}
				<div className="flex justify-between gap-4">
					<button
						onClick={handleInviteClick}
						className="bg-blue-500 w-4/5 h-12 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Invite
					</button>
					<button
						onClick={handleCopyLinkClick}
						className="bg-green-400 w-12 h-12 flex justify-center items-center text-white py-2 px-4 rounded-md shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
					>
						<span className="text-xl font-bold">
							<FaCopy />
						</span>
					</button>
				</div>
			</div>

			{/* Friends List */}
			{isLoading ? (
				<p>Loading friends...</p>
			) : isError ? (
				<p>Error: {message}</p>
			) : friends.length > 0 ? (
				<div className="bg-white rounded-md shadow-md p-5 mt-6 max-w-md w-full mx-auto">
					<h3 className="text-lg font-semibold mb-4">Your Friends</h3>
					<ul className="space-y-4">
						{friends.map((friend, index) => (
							<li key={friend.id} className="flex items-center justify-between">
								<span>
									{index + 1}. {friend.name}
								</span>
								<span>+{friend.woofPoints} WOOF</span>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No friends yet. Invite some!</p>
			)}
			{/* Notification Popup */}
			{notificationVisible && (
				<div className="absolute top-0 right-1/2 m-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
					<p>Copied to clipboard!</p>
				</div>
			)}
		</div>
	);
};

export default Friends;
