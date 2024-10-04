import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Task from "../pages/Task";
import Home from "../pages/Home";
import App from "../App";
import GetStarted from "../components/GetStarted";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/tasks",
				element: <Task />,
			},
		],
	},
	{
		path: "/startapp",
		element: <GetStarted />,
	},
	{ path: "*", element: <NotFound /> },
]);

export default router;
