import { useDarkMode } from "../hooks/useDarkMode";

export default function Header() {
	const { theme, toggle } = useDarkMode("dark");

	return (
		<header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/60 backdrop-blur border-b border-slate-200 dark:border-slate-800">
			<div className="mx-auto px-4 py-3 flex items-center gap-4">
				{/* logo */}
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 grid place-items-center text-xs font-semibold shadow">
						18+
					</div>
					<div className="leading-tight">
						<h1 className="font-semibold tracking-tight text-slate-900 dark:text-slate-100">
							Prepagos
						</h1>
						<span className="text-[11px] text-slate-500 dark:text-slate-400">
							Directorio para adultos
						</span>
					</div>
				</div>

				{/* search (dummy) */}
				<div className="flex-1 hidden md:block">
					<div className="relative">
						<input
							type="search"
							placeholder="Buscar por nombre, ciudad o categoría…"
							className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
						/>
						<svg
							className="absolute left-3 top-2.5"
							width="18"
							height="18"
							viewBox="0 0 24 24"
						>
							<path
								d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
								stroke="currentColor"
								strokeWidth="2"
								fill="none"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</div>

				{/* nav */}
				<nav className="ml-auto flex items-center gap-3">
					<a
						href="#"
						className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
					>
						Aviso de privacidad
					</a>

					{/* Theme toggle */}
					<button
						type="button"
						onClick={toggle}
						className="inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
					>
						{theme === "dark" ? "Modo claro" : "Modo oscuro"}
					</button>

					<a
						href="#"
						className="hidden sm:inline-flex items-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-2 text-xs font-medium shadow"
					>
						Publicar
					</a>
				</nav>
			</div>
		</header>
	);
}
