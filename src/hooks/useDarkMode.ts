// src/hooks/useDarkMode.ts
import { useCallback, useEffect, useRef, useState } from "react";

type ThemePref = "light" | "dark" | "system";
type Resolved = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): Resolved {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyThemeToDOM(theme: Resolved) {
	const root = document.documentElement; // <html>
	root.classList.toggle("dark", theme === "dark");
	// Ayuda a formularios nativos y scrollbars:
	root.style.colorScheme = theme;
}

export function useDarkMode(defaultPref: ThemePref = "system") {
	const [pref, setPref] = useState<ThemePref>(() => {
		const saved =
			typeof window !== "undefined"
				? (localStorage.getItem(STORAGE_KEY) as ThemePref | null)
				: null;
		return saved ?? defaultPref;
	});

	const mqlRef = useRef<MediaQueryList | null>(null);
	const resolved: Resolved =
		pref === "system"
			? typeof window !== "undefined"
				? getSystemTheme()
				: "light"
			: pref;

	// Aplica inmediatamente cuando cambia la preferencia/resolución:
	useEffect(() => {
		applyThemeToDOM(resolved);
	}, [resolved]);

	// Suscríbete a cambios del sistema si la preferencia es "system"
	useEffect(() => {
		if (typeof window === "undefined") return;
		mqlRef.current = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => {
			if (pref === "system") applyThemeToDOM(getSystemTheme());
		};
		mqlRef.current.addEventListener("change", handler);
		return () => mqlRef.current?.removeEventListener("change", handler);
	}, [pref]);

	// Guarda cambios en localStorage excepto cuando es "system"
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (pref === "system") localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, pref);
	}, [pref]);

	const setTheme = useCallback((next: ThemePref) => setPref(next), []);
	const toggle = useCallback(() => {
		// Toggle inteligente: si estas en system, usa el resolved actual para decidir
		const base: Resolved =
			pref === "system" ? getSystemTheme() : (pref as Resolved);
		setPref(base === "dark" ? "light" : "dark");
	}, [pref]);

	return {
		pref,
		theme: resolved,
		setTheme,
		toggle,
		isDark: resolved === "dark",
	};
}
