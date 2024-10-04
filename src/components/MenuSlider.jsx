import React from "react";
import { NavLink } from "react-router-dom";
import { GiDogHouse } from "react-icons/gi";
import { SiTask } from "react-icons/si";
import { MdLeaderboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const MenuSlider = () => {
	return (
		<nav className=" fixed bg-cyan-800 bottom-0 left-0 right-0 w-full shadow-2xl px-3 py-4 h-16">
			<ul className="flex items-center justify-between text-gray-100 max-w-md w-full mx-auto px-2">
				<li className="flex flex-col items-center">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center text-sm text-yellow-400"
								: "flex flex-col items-center text-sm text-gray-100"
						}
					>
						<GiDogHouse className=" text-lg" />
						<span>Home</span>
					</NavLink>
				</li>
				<li className="flex flex-col items-center">
					<NavLink
						to="/tasks"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center text-sm text-yellow-400"
								: "flex flex-col items-center text-sm text-gray-100"
						}
					>
						<SiTask className=" text-lg" />
						<span>Task</span>
					</NavLink>
				</li>

				<li className="flex flex-col items-center">
					<NavLink
						to="/leaderboards"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center text-sm text-yellow-400"
								: "flex flex-col items-center text-sm text-gray-100"
						}
					>
						<MdLeaderboard className=" text-lg" />
						<span>Leaderboard</span>
					</NavLink>
				</li>
				<li className="flex flex-col items-center">
					<NavLink
						to="/friends"
						className={({ isActive }) =>
							isActive
								? "flex flex-col items-center text-sm text-yellow-400"
								: "flex flex-col items-center text-sm text-gray-100"
						}
					>
						<FaUserFriends className=" text-lg" />
						<span>Friends</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default MenuSlider;
