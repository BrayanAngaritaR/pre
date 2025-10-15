import { useEffect, useMemo, useState } from "react";
import {
	APARIENCIA,
	ATENCION_A,
	CIUDADES,
	CONTACTO,
	CONTENIDO,
	ESTATURA,
	LUGAR,
	PECHO,
	PUBIS,
	SEXO,
} from "../data";

export type FiltersState = {
	categoria: string | null;
	sexo: string[];
	ciudad: string[];
	distanciaKm: number;
	precioMin: number;
	precioMax: number;
	edadMin: number;
	edadMax: number;
	atencionA: string[];
	contacto: string[];
	contenido: string[];
	apariencia: string[];
	estatura: string[];
	pecho: string[];
	pubis: string[];
	lugar: string[];
};

const DEFAULTS: FiltersState = {
	categoria: null,
	sexo: [],
	ciudad: [],
	distanciaKm: 10,
	precioMin: 0,
	precioMax: 300000,
	edadMin: 18,
	edadMax: 45,
	atencionA: [],
	contacto: [],
	contenido: [],
	apariencia: [],
	estatura: [],
	pecho: [],
	pubis: [],
	lugar: [],
};

type Props = {
	value?: Partial<FiltersState>;
	onChange: (f: FiltersState) => void;
	onClearAll?: () => void;
};

function Section({
	title,
	children,
	defaultOpen = true,
}: {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
}) {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div className="border rounded-xl">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium"
			>
				<span>{title}</span>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					className={`transition-transform ${open ? "rotate-180" : ""}`}
				>
					<path
						d="M6 9l6 6 6-6"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						strokeLinecap="round"
					/>
				</svg>
			</button>
			{open && <div className="px-4 pb-4">{children}</div>}
		</div>
	);
}

export default function Filters({ value, onChange, onClearAll }: Props) {
	const [state, setState] = useState<FiltersState>({
		...DEFAULTS,
		...(value || {}),
	});

	// sincroniza cuando value cambia desde fuera
	useEffect(() => {
		if (value) setState((prev) => ({ ...prev, ...value }));
	}, [value]);

	function toggle(list: string[], item: string) {
		return list.includes(item)
			? list.filter((i) => i !== item)
			: [...list, item];
	}
	function upd<K extends keyof FiltersState>(k: K, v: FiltersState[K]) {
		const next = { ...state, [k]: v };
		setState(next);
		onChange(next);
	}
	function reset() {
		setState(DEFAULTS);
		onChange(DEFAULTS);
		onClearAll?.();
	}

	const chips = useMemo(
		() => ({
			sexo: SEXO,
			ciudad: CIUDADES,
			atencionA: ATENCION_A,
			contacto: CONTACTO,
			contenido: CONTENIDO,
			apariencia: APARIENCIA,
			estatura: ESTATURA,
			pecho: PECHO,
			pubis: PUBIS,
			lugar: LUGAR,
		}),
		[],
	);

	return (
		<aside
			id="filtros"
			className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-sm"
		>
			<div className="flex items-center justify-between">
				<h4 className="font-semibold">Filtros</h4>
				<button
					onClick={reset}
					className="text-xs text-slate-500 underline hover:text-slate-700"
				>
					Limpiar todo
				</button>
			</div>

			<Section title="Distancia" defaultOpen={true}>
				<label className="block text-xs mb-2 text-slate-500">
					Hasta {state.distanciaKm} km
				</label>
				<input
					type="range"
					min={1}
					max={50}
					value={state.distanciaKm}
					onChange={(e) => upd("distanciaKm", Number(e.target.value))}
					className="w-full accent-slate-900"
				/>
			</Section>

			<Section title="Precio" defaultOpen={true}>
				<div className="grid grid-cols-2 gap-2">
					<div>
						<label className="block text-xs mb-1 text-slate-500">Mínimo</label>
						<input
							type="number"
							value={state.precioMin}
							onChange={(e) => upd("precioMin", Number(e.target.value))}
							className="w-full rounded-lg border px-3 py-2 text-sm"
						/>
					</div>
					<div>
						<label className="block text-xs mb-1 text-slate-500">Máximo</label>
						<input
							type="number"
							value={state.precioMax}
							onChange={(e) => upd("precioMax", Number(e.target.value))}
							className="w-full rounded-lg border px-3 py-2 text-sm"
						/>
					</div>
				</div>
			</Section>

			<Section title="Edad" defaultOpen={false}>
				<div className="grid grid-cols-2 gap-2">
					<div>
						<label className="block text-xs mb-1 text-slate-500">Desde</label>
						<input
							type="number"
							min={18}
							value={state.edadMin}
							onChange={(e) => upd("edadMin", Number(e.target.value))}
							className="w-full rounded-lg border px-3 py-2 text-sm"
						/>
					</div>
					<div>
						<label className="block text-xs mb-1 text-slate-500">Hasta</label>
						<input
							type="number"
							min={18}
							value={state.edadMax}
							onChange={(e) => upd("edadMax", Number(e.target.value))}
							className="w-full rounded-lg border px-3 py-2 text-sm"
						/>
					</div>
				</div>
			</Section>

			{/* Chips genéricos */}
			{Object.entries(chips).map(([key, list]) => (
				<Section
					key={key}
					title={key.replace(/([A-Z])/g, " $1")}
					defaultOpen={false}
				>
					<div className="flex flex-wrap gap-2">
						{(list as string[]).map((item) => {
							const selected = (state as any)[key].includes(item);
							return (
								<button
									key={item}
									onClick={() =>
										upd(key as any, toggle((state as any)[key], item))
									}
									className={`px-3 py-1.5 rounded-full border text-sm transition ${
										selected
											? "border-slate-900 bg-slate-900 text-white"
											: "border-slate-300 hover:bg-slate-50"
									}`}
								>
									{item}
								</button>
							);
						})}
					</div>
				</Section>
			))}
		</aside>
	);
}
