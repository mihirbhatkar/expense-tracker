import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import store from "./store.js";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import WalletsPage from "./Pages/WalletsPage.jsx";
import ExpensePage from "./Pages/ExpensePage.jsx";
import InsightsPage from "./Pages/InsightsPage.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			{/* these are the protected routes  */}
			<Route path="" element={<PrivateRoute />}>
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/wallets" element={<WalletsPage />} />
				<Route path="/expenses" element={<ExpensePage />} />
				<Route path="/insights" element={<InsightsPage />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
