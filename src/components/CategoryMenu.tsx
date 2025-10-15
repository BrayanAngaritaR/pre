import { CATEGORIES } from "../data";

export default function CategoryMenu() {
	return (
		<div className="w-full overflow-x-auto">
			<ul className="flex gap-2 py-2">
				{CATEGORIES.map((category) => (
					<li key={category}>
						<button
							type="button"
							className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-400 text-sm whitespace-nowrap"
						>
							{category}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
