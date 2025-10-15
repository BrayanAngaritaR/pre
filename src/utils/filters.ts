// src/utils/filters.ts
import type { FiltersState } from "../components/Filters";
import type { Perfil } from "../data";

export const DEFAULT_FILTERS: FiltersState = {
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

export function matchesFilters(p: Perfil, f: FiltersState): boolean {
	if (f.categoria && !p.categorias.includes(f.categoria)) return false;
	if (f.sexo.length && !f.sexo.includes(p.sexo)) return false;
	if (f.ciudad.length && !f.ciudad.includes(p.ciudad)) return false;
	if (p.distanciaKm > f.distanciaKm) return false;
	if (p.precioMax < f.precioMin) return false;
	if (p.precioMin > f.precioMax) return false;
	if (p.edad < f.edadMin || p.edad > f.edadMax) return false;
	const needAllIn = (need: string[], have: string[] = []) =>
		need.every((n) => have.includes(n));
	if (f.atencionA.length && !needAllIn(f.atencionA, p.atencionA)) return false;
	if (f.contacto.length && !needAllIn(f.contacto, p.contacto)) return false;
	if (f.contenido.length && !needAllIn(f.contenido, p.contenido)) return false;
	if (
		f.apariencia.length &&
		(!p.apariencia || !f.apariencia.includes(p.apariencia))
	)
		return false;
	if (f.estatura.length && (!p.estatura || !f.estatura.includes(p.estatura)))
		return false;
	if (f.pecho.length && (!p.pecho || !f.pecho.includes(p.pecho))) return false;
	if (f.pubis.length && (!p.pubis || !f.pubis.includes(p.pubis))) return false;
	if (f.lugar.length && !needAllIn(f.lugar, p.lugar)) return false;
	return true;
}
