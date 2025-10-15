// src/components/Card.tsx
import { Link } from "react-router-dom";
import type { Perfil } from "../data";

export default function Card({ perfil }: { perfil: Perfil }) {
	const cover = perfil.fotos[0];

	return (
		<Link
			to={`/perfil/${perfil.id}`}
			className="group block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition"
		>
			<div className="aspect-[3/4] overflow-hidden">
				<img
					src={cover}
					alt={perfil.nombre}
					className="w-full h-full object-cover group-hover:scale-[1.02] transition"
					loading="lazy"
				/>
			</div>
			<div className="p-3">
				<div className="flex items-center gap-2 text-sm">
					<span className="font-semibold truncate">{perfil.nombre}</span>
					<span className="text-slate-500 dark:text-slate-400">
						• {perfil.edad}
					</span>
					{perfil.verified && (
						<span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white">
							Verificada
						</span>
					)}
				</div>
				<div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
					${perfil.precioMin.toLocaleString()} – $
					{perfil.precioMax.toLocaleString()}
				</div>
				<div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
					{perfil.photoCount ?? perfil.fotos.length} fotos • {perfil.ciudad}
				</div>
				<div className="mt-2 text-center text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 py-1">
					Ver anuncio
				</div>
			</div>
		</Link>
	);
}
