// src/components/CategoryMenu.tsx
import { CATEGORIES } from "../data";

type Props = {
	value: string | null;
	onChange: (v: string | null) => void;
};

export default function CategoryMenu({ value, onChange }: Props) {
	return (
		<div className="flex gap-2 overflow-x-auto no-scrollbar">
			<button
				type="submit"
				onClick={() => onChange(null)}
				className={`px-3 py-1.5 rounded-full border text-sm ${
					value === null
						? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
						: ""
				}`}
			>
				Todas
			</button>
			{CATEGORIES.map((c) => (
				<button
					type="submit"
					key={c}
					onClick={() => onChange(value === c ? null : c)}
					className={`px-3 py-1.5 rounded-full border text-sm ${
						value === c
							? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
							: "border-slate-300 dark:border-slate-700"
					}`}
				>
					{c}
				</button>
			))}
		</div>
	);
}
