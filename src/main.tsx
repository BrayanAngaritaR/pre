// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Vite expone el base en import.meta.env.BASE_URL (ej. "/" o "/pre/")
// React Router prefiere sin slash final.
const rawBase = import.meta.env.BASE_URL || "/";
const basename = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter basename={basename === "" ? "/" : basename}>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
