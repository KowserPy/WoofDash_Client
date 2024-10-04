import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Task = () => {
	const navigate = useNavigate();
	useEffect(() => {
		// Show the Telegram back button
		Telegram.WebApp.BackButton.show();

		const handleBackButtonClick = () => {
			navigate(-1); // Go back to the previous route
		};

		// Set the click event for the Telegram back button
		Telegram.WebApp.BackButton.onClick(handleBackButtonClick);

		// Clean up the event listener and hide the back button when unmounted
		return () => {
			Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
			Telegram.WebApp.BackButton.hide(); // Optionally hide the button when leaving the page
		};
	}, [navigate]);
	return <div>Task</div>;
};

export default Task;
