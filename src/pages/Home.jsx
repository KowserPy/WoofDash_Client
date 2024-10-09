import React from "react";
import Profile from "../components/Profile";
// import DailyTask from "../components/DailyTask";
// import PlayNow from "../components/PlayNow";

const Home = () => {
	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center p-5 gap-5 h-[calc(100vh-4rem)] hide-scrollbar overflow-y-scroll space-y-6 pb-20">
			<Profile />
			{/* <PlayNow />
			<DailyTask /> */}
		</div>
	);
};

export default Home;
