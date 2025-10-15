export default function MasonrySeven() {
	const imgs = Array.from({ length: 7 }).map(
		(_, i) => `https://picsum.photos/seed/m${i}/1000/${600 + ((i * 37) % 220)}`,
	);
	return (
		<section className="max-w-7xl mx-auto px-4">
			<h2 className="text-lg font-semibold mb-3">Galería</h2>
			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
				{imgs.map((src, i) => (
					<figure
						key={i}
						className="mb-3 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white"
					>
						<img
							src={src}
							alt={`foto ${i + 1}`}
							className="w-full h-auto object-cover"
						/>
					</figure>
				))}
			</div>
		</section>
	);
}
