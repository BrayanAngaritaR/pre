// src/pages/PlansPage.tsx
import { PLANS, SITE_CONFIG } from "../data";

const PRICES: Record<keyof typeof PLANS, number> = {
	monthly: 79900, // COP demo
	quarterly: 219900,
	semiannual: 399900,
};

export default function PlansPage() {
	const freeUntil = new Date(SITE_CONFIG.freeTrialUntilISO);

	return (
		<main className="mx-auto w-full max-w-[1200px] px-6 py-8 space-y-8">
			<header className="space-y-1">
				<h1 className="text-2xl font-bold">Planes</h1>
				<p className="text-sm text-slate-500 dark:text-slate-400">
					Publica tu anuncio y aumenta tu visibilidad. Mensual, trimestral o
					semestral.
				</p>
			</header>

			{/* Free trial banner */}
			<div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
				<p className="text-sm text-amber-900 dark:text-amber-200">
					Lanzamiento: publicar es <strong>gratis</strong> hasta{" "}
					{freeUntil.toLocaleDateString()}. Te enviaremos recordatorios por
					correo antes del cambio de plan.
				</p>
			</div>

			{/* Pricing grid */}
			<section className="grid gap-6 grid-cols-1 md:grid-cols-3">
				{Object.values(PLANS).map((plan) => (
					<article
						key={plan.id}
						className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
					>
						<h3 className="text-lg font-semibold">{plan.label}</h3>
						<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
							{plan.months} {plan.months > 1 ? "meses" : "mes"} de visibilidad
							prioritaria.
						</p>
						<div className="mt-4 text-2xl font-bold">
							${PRICES[plan.id as keyof typeof PRICES].toLocaleString()}{" "}
							<span className="text-sm font-normal text-slate-500">COP</span>
						</div>

						<ul className="mt-4 space-y-2 text-sm">
							<li>• Anuncio destacado en Home (Destacadas)</li>
							<li>• Mejor posición en búsquedas</li>
							<li>• Estadísticas básicas</li>
							<li>• Verificación por email/WhatsApp</li>
						</ul>

						<button
							type="button"
							className="mt-6 w-full rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-2.5 font-medium"
							// onClick={() => navigate('/checkout?plan=' + plan.id)}
						>
							Elegir {plan.label}
						</button>
					</article>
				))}
			</section>

			<footer className="text-xs text-slate-500 dark:text-slate-400">
				¿Dudas? Escríbenos a{" "}
				<a className="underline" href={`mailto:${SITE_CONFIG.email}`}>
					{SITE_CONFIG.email}
				</a>
				.
			</footer>
		</main>
	);
}
