import { useMemo, useState } from "react";
import type { Perfil as PerfilType } from "../data";
import { PERFILES, POSTS } from "../data";
import { Carousel } from "./Carousel";

export function Feed({ visibles }: { visibles: PerfilType[] }) {
	const visibleIds = useMemo(
		() => new Set(visibles.map((p) => p.id)),
		[visibles],
	);
	const posts = useMemo(
		() => POSTS.filter((x) => visibleIds.has(x.perfilId)).slice(0, 20),
		[visibleIds],
	);
	const [likes, setLikes] = useState<Record<string, boolean>>({});
	return (
		<section id="feed" className="max-w-2xl mx-auto px-4">
			<h2 className="text-lg font-semibold mb-3">Publicaciones</h2>
			<div className="space-y-6">
				{posts.map((post) => {
					const perfil = PERFILES.find((p) => p.id === post.perfilId)!;
					const liked = !!likes[post.id];
					return (
						<article
							key={post.id}
							className="bg-white border rounded-xl overflow-hidden"
						>
							<header className="flex items-center gap-3 px-4 py-3 border-b">
								<img
									src={perfil.fotos[0]}
									className="h-9 w-9 rounded-full object-cover"
								/>
								<div className="flex flex-col">
									<a
										href={`/perfil/${perfil.id}`}
										className="font-semibold hover:underline"
									>
										{perfil.nombre}
									</a>
									<span className="text-xs text-slate-500">
										{new Date(post.createdAt).toLocaleString()}
									</span>
								</div>
							</header>
							<Carousel images={post.media} />
							<div className="px-4 py-3 space-y-2">
								<div className="flex items-center gap-3">
									<button
										onClick={() => setLikes({ ...likes, [post.id]: !liked })}
										className={`px-3 py-1.5 rounded text-sm ${liked ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-700"}`}
									>
										{liked ? "♥ Me gusta" : "♡ Me gusta"}
									</button>
									<a
										href={`/perfil/${perfil.id}`}
										className="px-3 py-1.5 rounded bg-slate-900 text-white text-sm"
									>
										Contactar
									</a>
								</div>
								{post.caption && (
									<p className="text-sm">
										<span className="font-semibold mr-1">{perfil.nombre}</span>
										{post.caption}
									</p>
								)}
								<div className="text-xs text-slate-500">
									{(post.likes || 0) + (liked ? 1 : 0)} me gusta •{" "}
									{post.comments || 0} comentarios
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
