// data.ts
export const SITE_CONFIG = {
	name: "Prepagos Medellín",
	email: "prepagosmedellin@gmail.com",
	domain: "prepagosmedellin.com",
	freeTrialUntilISO: "2026-01-31T23:59:59.000Z", // 3 meses gratis (ejemplo)
	maxPhotos: 10,
	maxVideos: 3,
	requireIdCheck: true, // solicitar cédula para mayoría de edad
};

export type PlanId = "monthly" | "quarterly" | "semiannual" | "free";
export const PLANS: Record<
	Exclude<PlanId, "free">,
	{ id: PlanId; label: string; months: number }
> = {
	monthly: { id: "monthly", label: "Mensual", months: 1 },
	quarterly: { id: "quarterly", label: "Trimestral", months: 3 },
	semiannual: { id: "semiannual", label: "Semestral", months: 6 },
};

// etiquetas para buscador
export const TAGS_BUSCADOR = [
	"Rubia",
	"Madura",
	"Voluptuosa",
	"Tatuajes",
	"Piercings",
];

// ✅ Tus categorías originales
export const CATEGORIES = [
	"Masajes",
	"Videollamadas",
	"Acompañamiento",
	"Fotos privadas",
	"Shows",
];

// ✅ Tus ciudades (Fase 1: AMVA – tal como las necesitas en Filters.tsx)
export const CIUDADES = ["Medellín", "Envigado", "Itagüí", "Sabaneta"];

export const SEXO = ["Hombre", "Mujer", "Trans"];

export const ATENCION_A = [
	"Hombres",
	"Mujeres",
	"Parejas",
	"Personas con discapacidad",
];
export const CONTACTO = ["Llamada", "WhatsApp", "Telegram"];
export const CONTENIDO = [
	"Fotos verificadas",
	"Cara visible",
	"Con videos",
	"Con audio",
	"Con reseñas",
];
export const APARIENCIA = ["Delgada", "Gordita"];
export const ESTATURA = ["Bajita", "Alta"];
export const PECHO = ["Naturales", "Grandes"];
export const PUBIS = ["Depiladas", "Sin depilar"];
export const LUGAR = [
	"A domicilio",
	"Apartamento propio",
	"Cena romántica",
	"Club intercambio",
	"Despedidas de soltero",
	"Eventos y fiestas",
	"Hotel / Motel",
	"Viajes",
];

export type StoryItem = {
	src: string; // imagen/video (para demo ponemos imágenes)
	caption?: string;
	createdAtISO: string; // para ordenar/expirar si quieres
};

export type StoryCategory = {
	label: string; // etiqueta visible (p.ej. “Nuevas”, “Verificadas”, “Clips”)
	items: StoryItem[]; // items dentro de la categoría
	highlight?: boolean; // para anillo degradado/“vistas” simuladas
};

export type Perfil = {
	id: string;
	nombre: string;
	edad: number;
	ciudad: string;
	distanciaKm: number;
	precioMin: number;
	precioMax: number;
	sexo: string;
	categorias: string[];
	atencionA: string[];
	contacto: string[];
	contenido: string[];
	apariencia?: string;
	estatura?: string;
	pecho?: string;
	pubis?: string;
	lugar: string[];
	fotos: string[]; // URLs
	bio?: string;

	// extras útiles para UI y negocio
	verified?: boolean;
	photoCount?: number;
	plan: PlanId;
	tags?: string[];
	whatsappVerified?: boolean;
	emailVerified?: boolean;
	idVerified?: boolean;

	// ⭐️ Stories agrupadas por “categorías”
	stories?: StoryCategory[];
};

// utils
function pick<T>(arr: readonly T[], i: number) {
	return arr[i % arr.length];
}

// helper de stories demo
function demoStories(seed: number): StoryCategory[] {
	// 3 categorías por perfil, con 2-4 items cada una
	const mk = (label: string, n: number, offset = 0): StoryCategory => ({
		label,
		highlight: (seed + offset) % 2 === 0,
		items: Array.from({ length: n }).map((_, j) => ({
			src: `https://picsum.photos/seed/story-${seed}-${label}-${j}/1080/1920`,
			caption: `${label} · #${j + 1}`,
			createdAtISO: new Date(Date.now() - (seed + j) * 3600_000).toISOString(),
		})),
	});

	return [mk("Nuevas", 3, 0), mk("Verificadas", 2, 1), mk("Clips", 4, 2)];
}

// 30 perfiles para la grilla destacada
export const PERFILES_30: Perfil[] = Array.from({ length: 30 }).map((_, i) => {
	const fotos = [
		`https://picsum.photos/seed/${i}-1/1200/1600`,
		`https://picsum.photos/seed/${i}-2/1200/1600`,
		`https://picsum.photos/seed/${i}-3/1200/1600`,
		`https://picsum.photos/seed/${i}-4/1200/1600`,
		`https://picsum.photos/seed/${i}-5/1200/1600`,
	];
	const precioMin = 100000 + (i % 5) * 20000;
	const precioMax = 200000 + (i % 5) * 30000;

	return {
		id: `p${i + 1}`,
		nombre: `Perfil ${i + 1}`,
		edad: 20 + ((i * 3) % 20),
		ciudad: pick(CIUDADES, i),
		distanciaKm: (i * 3) % 20,
		precioMin,
		precioMax,
		sexo: pick(SEXO, i),
		categorias: [pick(CATEGORIES, i)],
		atencionA: [pick(ATENCION_A, i)],
		contacto: [pick(CONTACTO, i)],
		contenido: [pick(CONTENIDO, i)],
		apariencia: pick(APARIENCIA, i),
		estatura: pick(ESTATURA, i),
		pecho: pick(PECHO, i),
		pubis: pick(PUBIS, i),
		lugar: [pick(LUGAR, i)],
		fotos,
		photoCount: fotos.length,
		bio: "Descripción breve y discreta del perfil.",
		verified: i % 3 === 0,
		whatsappVerified: i % 3 === 0,
		emailVerified: i % 4 === 0,
		idVerified: SITE_CONFIG.requireIdCheck ? i % 5 === 0 : false,
		tags: [pick(TAGS_BUSCADOR, i)],
		plan: (["monthly", "quarterly", "semiannual", "free"] as PlanId[])[i % 4],
		stories: demoStories(i),
	};
});

// Galería demo extra (si la usas)
export const FOTOS_7 = Array.from({ length: 7 }).map(
	(_, i) => `https://picsum.photos/seed/m${i}/1600/${900 + ((i * 35) % 200)}`,
);

// Dataset principal (pagas + free)
export const PERFILES: Perfil[] = Array.from({ length: 60 }).map((_, i) => {
	const fotos = [
		`https://picsum.photos/seed/${i}-1/1200/1600`,
		`https://picsum.photos/seed/${i}-2/1200/1600`,
		`https://picsum.photos/seed/${i}-3/1200/1600`,
	];
	const base = 80000 + (i % 5) * 20000;

	return {
		id: `p${i + 1}`,
		nombre: `Perfil ${i + 1}`,
		edad: 20 + ((i * 3) % 20),
		ciudad: pick(CIUDADES, i),
		distanciaKm: (i * 3) % 20,
		precioMin: base,
		precioMax: base + 120000,
		sexo: pick(SEXO, i),
		categorias: [pick(CATEGORIES, i)],
		atencionA: [pick(ATENCION_A, i)],
		contacto: [pick(CONTACTO, i)],
		contenido: [pick(CONTENIDO, i)],
		apariencia: pick(APARIENCIA, i),
		estatura: pick(ESTATURA, i),
		pecho: pick(PECHO, i),
		pubis: pick(PUBIS, i),
		lugar: [pick(LUGAR, i)],
		fotos,
		photoCount: fotos.length,
		bio: "Descripción breve y discreta del perfil.",
		verified: i % 3 === 0,
		whatsappVerified: i % 3 === 0,
		emailVerified: i % 4 === 0,
		idVerified: SITE_CONFIG.requireIdCheck ? i % 5 === 0 : false,
		tags: [pick(TAGS_BUSCADOR, i)],
		plan:
			i < 30
				? (["monthly", "quarterly", "semiannual"][i % 3] as PlanId)
				: "free",
		stories: demoStories(i + 100), // distinto seed para variar
	};
});

export type Post = {
	id: string;
	perfilId: string;
	media: string[];
	caption?: string;
	createdAt: string;
	likes?: number;
	comments?: number;
};

// POSTS: para la vista de perfil
export const POSTS: Post[] = PERFILES.flatMap((p, idx) => {
	const n = (idx % 2) + 1;
	return Array.from({ length: n }).map((_, j) => ({
		id: `post-${p.id}-${j + 1}`,
		perfilId: p.id,
		media: [
			`https://picsum.photos/seed/${p.id}-${j}-a/1080/1350`,
			`https://picsum.photos/seed/${p.id}-${j}-b/1080/1350`,
			`https://picsum.photos/seed/${p.id}-${j}-c/1080/1350`,
		],
		caption: `Publicación de ${p.nombre}`,
		createdAt: new Date(Date.now() - (idx + j) * 86400000).toISOString(),
		likes: 50 + (((idx + j) * 7) % 500),
		comments: ((idx + j) * 3) % 100,
	}));
});
