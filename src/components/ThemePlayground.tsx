import { useDarkMode } from "../hooks/useDarkMode";

export default function ThemePlayground() {
	const { pref, theme, isDark, setTheme, toggle } = useDarkMode("system");

	return (
		<section className="mx-auto max-w-3xl px-4 py-8">
			{/* Header del playground */}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-xl font-semibold tracking-tight">
						Theme Playground
					</h2>
					<p className="text-sm text-slate-600 dark:text-slate-400">
						Pref: <span className="font-medium">{pref}</span> · Resolved:{" "}
						<span className="font-medium">{theme}</span>
					</p>
				</div>

				<button
					type="button"
					onClick={toggle}
					className="inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
				>
					{isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
				</button>
			</div>

			{/* Selector 3 estados */}
			<div className="flex gap-2 mb-8">
				<button
					onClick={() => setTheme("light")}
					className={`rounded-lg px-3 py-2 text-xs font-medium border
            ${
							pref === "light"
								? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent"
								: "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
						}
          `}
				>
					Claro
				</button>
				<button
					onClick={() => setTheme("dark")}
					className={`rounded-lg px-3 py-2 text-xs font-medium border
            ${
							pref === "dark"
								? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent"
								: "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
						}
          `}
				>
					Oscuro
				</button>
				<button
					onClick={() => setTheme("system")}
					className={`rounded-lg px-3 py-2 text-xs font-medium border
            ${
							pref === "system"
								? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent"
								: "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
						}
          `}
				>
					Sistema
				</button>
			</div>

			{/* Tarjetas de demostración con variantes dark: */}
			<div className="grid gap-4 md:grid-cols-2">
				<article className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm bg-white/70 dark:bg-slate-900/60 backdrop-blur">
					<h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
						Tarjeta / Card
					</h3>
					<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
						Esta tarjeta usa <code>dark:</code> en fondo, borde y texto.
					</p>
					<div className="flex gap-2">
						<span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200">
							Badge
						</span>
						<button className="inline-flex items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-2 text-xs font-medium shadow hover:opacity-90">
							Acción primaria
						</button>
					</div>
				</article>

				<article className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm bg-white/70 dark:bg-slate-900/60 backdrop-blur">
					<h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
						Inputs / Focus rings
					</h3>
					<div className="space-y-3">
						<input
							type="text"
							placeholder="Nombre"
							className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
						/>
						<input
							type="email"
							placeholder="Correo"
							className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
						/>
					</div>
				</article>
			</div>

			{/* Bloque de contraste para ver el body */}
			<div className="mt-8 rounded-2xl p-6 border border-dashed border-slate-300 dark:border-slate-700">
				<p className="text-sm text-slate-700 dark:text-slate-200">
					Fondo del body actual:{" "}
					<span className="font-medium">white / slate-950</span> según el tema.
				</p>
			</div>
		</section>
	);
}
