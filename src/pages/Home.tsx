// src/pages/Home.tsx (con Layout global que ya pinta Header/Footer)
import { useDeferredValue, useMemo, useState } from "react";
import CategoryMenu from "../components/CategoryMenu";
import Filters, { type FiltersState } from "../components/Filters";
import Grid from "../components/Grid";
import { PERFILES, SITE_CONFIG } from "../data";
import { DEFAULT_FILTERS as DEFAULTS, matchesFilters } from "../utils/filters";
import { splitPaidUnpaid } from "../utils/listing";

export default function Home() {
	const [filters, setFilters] = useState<FiltersState>(DEFAULTS);
	const [categoria, setCategoria] = useState<string | null>(null);
	const [showFilters, setShowFilters] = useState(false);
	const [sort, setSort] = useState<"relevance" | "priceAsc" | "priceDesc">(
		"relevance",
	);

	const effective = useMemo<FiltersState>(
		() => ({ ...filters, categoria }),
		[filters, categoria],
	);
	const deferredEffective = useDeferredValue(effective);

	const filtered = useMemo(
		() => PERFILES.filter((p) => matchesFilters(p, deferredEffective)),
		[deferredEffective],
	);
	const { paid, unpaid } = useMemo(() => splitPaidUnpaid(filtered), [filtered]);

	const sortedPaid = useMemo(() => {
		if (sort === "priceAsc")
			return [...paid].sort((a, b) => a.precioMin - b.precioMin);
		if (sort === "priceDesc")
			return [...paid].sort((a, b) => b.precioMin - a.precioMin);
		return paid;
	}, [paid, sort]);

	const sortedUnpaid = useMemo(() => {
		if (sort === "priceAsc")
			return [...unpaid].sort((a, b) => a.precioMin - b.precioMin);
		if (sort === "priceDesc")
			return [...unpaid].sort((a, b) => b.precioMin - a.precioMin);
		return unpaid;
	}, [unpaid, sort]);

	const clearAll = () => {
		setFilters(DEFAULTS);
		setCategoria(null);
	};
	const isFreeNow = new Date().toISOString() <= SITE_CONFIG.freeTrialUntilISO;

	return (
		<>
			{isFreeNow && (
				<div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
					<div className="mx-auto w-full text-center px-6 py-2 text-sm text-amber-800 dark:text-amber-200">
						¡Lanzamiento! Publicar es gratis hasta{" "}
						{new Date(SITE_CONFIG.freeTrialUntilISO).toLocaleDateString()}.
						Recibirás correos de expiración antes del cambio de plan.
					</div>
				</div>
			)}

			<main className="mx-auto w-full px-6 py-6 space-y-8">
				<CategoryMenu value={categoria} onChange={setCategoria} />

				<div className="flex items-center justify-between gap-4">
					<button
						type="button"
						onClick={() => setShowFilters(true)}
						className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
					>
						<svg width="16" height="16" viewBox="0 0 24 24">
							<path
								d="M3 5h18M6 12h12M10 19h4"
								stroke="currentColor"
								strokeWidth="2"
								fill="none"
								strokeLinecap="round"
							/>
						</svg>
						Filtros
					</button>

					<div className="flex items-center gap-2">
						<span className="text-sm text-slate-500 dark:text-slate-400">
							{filtered.length} resultados
						</span>
						<select
							value={sort}
							onChange={(e) => setSort(e.target.value as any)}
							className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm px-3 py-2"
						>
							<option value="relevance">Relevancia</option>
							<option value="priceAsc">Precio: menor a mayor</option>
							<option value="priceDesc">Precio: mayor a menor</option>
						</select>
					</div>
				</div>

				<Grid title="Destacadas" perfiles={sortedPaid} />
				<div className="opacity-90">
					<Grid title="Más perfiles" perfiles={sortedUnpaid} />
				</div>
			</main>

			{showFilters && (
				<div className="fixed inset-0 z-50">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setShowFilters(false)}
					/>
					<div className="absolute top-0 left-0 bottom-0 w-[380px] max-w-[90vw] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-2xl">
						<div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
							<h3 className="font-semibold">Filtros</h3>
							<button
								type="button"
								onClick={() => setShowFilters(false)}
								className="rounded-lg border border-slate-300 dark:border-slate-700 px-2 py-1 text-sm"
							>
								Cerrar
							</button>
						</div>
						<div className="overflow-y-auto p-4 h-full pb-24">
							<Filters
								value={effective}
								onChange={setFilters}
								onClearAll={clearAll}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
