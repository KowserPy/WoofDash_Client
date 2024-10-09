// utils/telegramBackButton.js
export const setupTelegramBackButton = (navigate) => {
	// Show the Telegram back button
	Telegram.WebApp.BackButton.show();

	const handleBackButtonClick = () => {
		navigate(-1); // Go back to the previous route
	};

	// Set the click event for the Telegram back button
	Telegram.WebApp.BackButton.onClick(handleBackButtonClick);

	// Return a cleanup function to be used in the useEffect's cleanup step
	return () => {
		Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
		Telegram.WebApp.BackButton.hide(); // Optionally hide the button when leaving the page
	};
};
