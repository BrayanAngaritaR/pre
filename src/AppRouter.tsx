// src/AppRouter.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PlansPage from "./pages/PlansPage";
import ProfileDetailPage from "./pages/ProfilePage";

export default function AppRouter() {
	return (
		<div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/planes" element={<PlansPage />} />
				<Route path="/perfil/:id" element={<ProfileDetailPage />} />
				<Route path="/home" element={<Navigate to="/" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}
