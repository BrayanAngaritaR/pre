// utils/listing.ts
import type { Perfil } from "../data";

export function shuffle<T>(arr: T[]) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(((i + 1) * 9301 + 49297) % 233280) % (i + 1); // pseudo, estable-ish
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export function splitPaidUnpaid(list: Perfil[]) {
	const paid = shuffle(list.filter((p) => p.plan !== "free")).slice(0, 30);
	const paidIds = new Set(paid.map((x) => x.id));
	const unpaid = list.filter((p) => !paidIds.has(p.id));
	return { paid, unpaid };
}
