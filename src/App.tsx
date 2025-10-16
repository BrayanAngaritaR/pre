// src/App.tsx
import { Route, Routes } from "react-router-dom";
import ThemePlayground from "./components/ThemePlayground";
import Layout from "./Layout";
import Home from "./pages/Home";
import PlansPage from "./pages/PlansPage";
import ProfileDetailPage from "./pages/ProfilePage";

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/planes" element={<PlansPage />} />
				<Route path="/prueba" element={<ThemePlayground />} />
				<Route path="/perfil/:id" element={<ProfileDetailPage />} />
			</Route>
		</Routes>
	);
}
