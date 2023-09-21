import { useEffect, useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeSwitcher = () => {
	const [theme, setTheme] = useState(() => {
		// Retrieve the theme preference from localStorage on component mount
		return localStorage.getItem("theme") || "light";
	});

	const toggleTheme = () => {
		const newTheme = theme === "dracula" ? "light" : "dracula";
		setTheme(newTheme);
		// Save the theme preference to localStorage when the theme changes
		localStorage.setItem("theme", newTheme);
	};

	// Apply the theme to the HTML tag whenever the theme state changes
	useEffect(() => {
		document.querySelector("html").setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<label className="swap swap-rotate btn btn-ghost">
			<input onClick={toggleTheme} type="checkbox" />
			<div className="swap-on">
				{theme === "dracula" ? <BsFillMoonFill /> : <BsFillSunFill />}
			</div>
			<div className="swap-off">
				{theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
			</div>
		</label>
	);
};
export default ThemeSwitcher;
