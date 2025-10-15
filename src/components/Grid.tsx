// components/Grid.tsx

import type { Perfil } from "../data";
import Card from "./Card";

export default function Grid({
	title,
	perfiles,
}: {
	title: string;
	perfiles: Perfil[];
}) {
	return (
		<section className="px-4">
			<h2 className="text-xl font-semibold mb-4">{title}</h2>
			<div
				className="
          grid gap-5
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
			>
				{perfiles.map((p) => (
					<Card key={p.id} perfil={p} />
				))}
			</div>
		</section>
	);
}
