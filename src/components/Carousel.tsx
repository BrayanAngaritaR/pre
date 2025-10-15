import { useState } from "react";
export function Carousel({ images }: { images: string[] }) {
	const [i, setI] = useState(0);
	const prev = () => setI((i - 1 + images.length) % images.length);
	const next = () => setI((i + 1) % images.length);
	return (
		<div className="relative">
			<img src={images[i]} className="w-full h-auto object-cover rounded-xl" />
			<button
				type="button"
				onClick={prev}
				className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded"
			>
				‹
			</button>
			<button
				type="button"
				onClick={next}
				className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded"
			>
				›
			</button>
			<div className="flex gap-1 mt-2 justify-center">
				{images.map((_, idx) => (
					<button
						type="button"
						key={idx}
						onClick={() => setI(idx)}
						className={`h-2 w-2 rounded-full ${i === idx ? "bg-slate-900" : "bg-slate-300"}`}
					/>
				))}
			</div>
		</div>
	);
}
