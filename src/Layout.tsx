// src/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
	return (
		<div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
			<Header />

			{/* Las páginas renderizan su contenido dentro de Outlet */}
			<Outlet />

			<footer className="border-t border-slate-200 dark:border-slate-800">
				<div className="mx-auto text-center w-full max-w-[1600px] px-6 py-6 text-xs text-slate-500 dark:text-slate-400">
					<p>
						Solo para mayores de 18 años. Respeta las leyes locales y las normas
						de la plataforma.{" "}
					</p>
					<b>Versión 0.0.1</b>
				</div>
			</footer>
		</div>
	);
}
