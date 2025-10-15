// components/Card.tsx
import { Link } from "react-router-dom";
import type { Perfil } from "@/data";

export default function Card({ perfil }: { perfil: Perfil }) {
	const main = perfil.fotos[0];

	return (
		<article className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition">
			<Link to={`/perfil/${perfil.id}`} className="block">
				<div className="relative">
					<img
						src={main}
						alt={perfil.nombre}
						className="w-full h-auto object-cover aspect-[3/4]"
						loading="lazy"
					/>
					<div className="absolute top-2 left-2 flex gap-2">
						{perfil.verified && (
							<span className="rounded-full bg-emerald-600 text-white text-[11px] px-2 py-1">
								Verificada
							</span>
						)}
						<span className="rounded-full bg-black/70 text-white text-[11px] px-2 py-1">
							{perfil.photoCount ?? perfil.fotos.length} fotos
						</span>
					</div>
				</div>
			</Link>

			<div className="p-3">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold truncate">{perfil.nombre}</h3>
					<span className="text-sm text-slate-500">{perfil.edad} años</span>
				</div>
				<div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
					{perfil.ciudad} • {perfil.categorias.join(", ")}
				</div>
				<div className="mt-2 font-medium">
					${perfil.precioMin.toLocaleString()} – $
					{perfil.precioMax.toLocaleString()}
				</div>

				<Link
					to={`/perfil/${perfil.id}`}
					className="mt-3 w-full inline-flex justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-2 text-sm font-medium"
				>
					Ver anuncio
				</Link>
			</div>
		</article>
	);
}
