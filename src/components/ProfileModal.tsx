import type { Perfil } from "../data";
import { Carousel } from "./Carousel";

export function ProfileModalContent({ perfil }: { perfil: Perfil }) {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<Carousel images={perfil.fotos} />
			<div className="space-y-2">
				<h3 className="text-xl font-semibold">
					{perfil.nombre}{" "}
					<span className="text-slate-500 text-base">• {perfil.edad}</span>
				</h3>
				<p className="text-sm text-slate-600">{perfil.bio}</p>
				<div className="grid grid-cols-2 gap-2 text-sm">
					<div className="p-2 rounded bg-slate-50 border">
						Ciudad: {perfil.ciudad}
					</div>
					<div className="p-2 rounded bg-slate-50 border">
						Distancia: {perfil.distanciaKm} km
					</div>
					<div className="p-2 rounded bg-slate-50 border">
						Precio: ${perfil.precioMin.toLocaleString()} - $
						{perfil.precioMax.toLocaleString()}
					</div>
					<div className="p-2 rounded bg-slate-50 border">
						Sexo: {perfil.sexo}
					</div>
				</div>
				<div className="flex flex-wrap gap-2 text-xs">
					{perfil.categorias.map((x) => (
						<span key={x} className="px-2 py-1 rounded-full border">
							{x}
						</span>
					))}
					{perfil.contenido.map((x) => (
						<span key={x} className="px-2 py-1 rounded-full border">
							{x}
						</span>
					))}
				</div>
				<div className="flex gap-2 pt-2">
					<a
						className="px-3 py-2 rounded bg-emerald-600 text-white text-sm"
						href={`https://wa.me/573001112233`}
					>
						WhatsApp
					</a>
					<a
						className="px-3 py-2 rounded bg-slate-900 text-white text-sm"
						href={`/perfil/${perfil.id}`}
					>
						Ver perfil
					</a>
				</div>
			</div>
		</div>
	);
}
