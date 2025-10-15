// src/hooks/useDarkMode.ts
import { useEffect, useState } from "react";

export function useDarkMode(defaultTheme: "light" | "dark" = "light") {
	const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

	useEffect(() => {
		const saved = localStorage.getItem("theme") as "light" | "dark" | null;
		if (saved) {
			setTheme(saved);
			document.documentElement.classList.toggle("dark", saved === "dark");
		} else {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			const system = prefersDark ? "dark" : "light";
			setTheme(system);
			document.documentElement.classList.toggle("dark", system === "dark");
		}
	}, []);

	const toggle = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		localStorage.setItem("theme", next);
		document.documentElement.classList.toggle("dark", next === "dark");
	};

	return { theme, toggle };
}
