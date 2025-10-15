// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<main className="mx-auto w-full max-w-[900px] px-6 py-16">
			<h1 className="text-2xl font-bold">Página no encontrada</h1>
			<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
				La URL solicitada no existe.
			</p>
			<Link to="/" className="mt-4 inline-block underline">
				Volver al inicio
			</Link>
		</main>
	);
}
