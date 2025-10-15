import { PERFILES_30 } from "../data";
import Card from "./Card";

export default function GridSixCols() {
	// 6 columnas, 5 fotos por columna (30 total). Responsive: 2→3→4→6
	return (
		<section className="max-w-7xl mx-auto px-4">
			<h2 className="text-lg font-semibold mb-3">Destacados</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
				{PERFILES_30.map((p) => (
					<Card key={p.id} src={p.fotos[0]} label={`${p.nombre} • ${p.edad}`} />
				))}
			</div>
		</section>
	);
}
