import type { Perfil } from "../data";

type CardProps = { perfil: Perfil; onOpen: (p: Perfil) => void };
export function ProfileCard({ perfil, onOpen }: CardProps) {
	return (
		<article className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white">
			<button
				type="button"
				onClick={() => onOpen(perfil)}
				className="text-left w-full"
			>
				<img
					src={perfil.fotos[0]}
					alt={perfil.nombre}
					className="w-full h-auto object-cover aspect-[3/4]"
				/>
			</button>
			<div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-xs flex items-center justify-between">
				<span>
					{perfil.nombre} • {perfil.edad}
				</span>
				<a
					href={`/perfil/${perfil.id}`}
					className="underline decoration-white/60 hover:decoration-white"
				>
					Ver perfil
				</a>
			</div>
		</article>
	);
}
