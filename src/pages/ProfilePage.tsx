// src/pages/ProfileDetailPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { StoryCategory } from "../data";
import { getPostsByPerfil, getProfileById } from "../lib/profile";

/* Small helpers */
function classNames(...s: Array<string | false | null | undefined>) {
	return s.filter(Boolean).join(" ");
}

type MediaItem = { src: string; caption?: string; kind: "foto" | "post" };

/* ---------------------- STORIES: BAR (categorías) ----------------------- */

function StoryBar({
	categories,
	onOpen,
}: {
	categories: StoryCategory[];
	onOpen: (catIndex: number, itemIndex: number) => void;
}) {
	if (!categories?.length) return null;
	return (
		<div className="overflow-x-auto no-scrollbar -mx-6 px-6">
			<div className="flex items-center gap-4 py-3">
				{categories.map((cat, i) => {
					const cover = cat.items[0]?.src;
					return (
						<button
							key={i}
							type="button"
							onClick={() => onOpen(i, 0)}
							className="flex-shrink-0 grid place-items-center text-center"
							title={cat.label}
						>
							<span
								className={classNames(
									"p-[2px] rounded-full",
									cat.highlight
										? "bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400"
										: "bg-slate-300 dark:bg-slate-700",
								)}
							>
								<span className="block rounded-full bg-white dark:bg-slate-950 p-[2px]">
									<img
										src={cover}
										alt={cat.label}
										className="w-16 h-16 rounded-full object-cover"
										loading="lazy"
									/>
								</span>
							</span>
							<span className="mt-1 block w-20 truncate text-xs text-slate-600 dark:text-slate-300">
								{cat.label}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}

/* ---------------------- STORIES: VIEWER (autoplay) ---------------------- */

function StoryViewer({
	open,
	onClose,
	categories,
	startCat = 0,
	startItem = 0,
	durationMs = 5000,
}: {
	open: boolean;
	onClose: () => void;
	categories: StoryCategory[];
	startCat?: number;
	startItem?: number;
	durationMs?: number;
}) {
	const [catIdx, setCatIdx] = useState(startCat);
	const [itemIdx, setItemIdx] = useState(startItem);
	const [playing, setPlaying] = useState(true);
	const progressRef = useRef<number>(0);
	const rafRef = useRef<number | null>(null);
	const downRef = useRef(false);
	const touchStart = useRef<{ x: number; y: number } | null>(null);

	const items = categories[catIdx]?.items ?? [];
	const item = items[itemIdx];

	// reset when open or start changes
	useEffect(() => {
		if (!open) return;
		setCatIdx(startCat);
		setItemIdx(startItem);
		progressRef.current = 0;
	}, [open, startCat, startItem]);

	// autoplay
	useEffect(() => {
		if (!open || !playing) return;
		let last = performance.now();
		const step = (now: number) => {
			const delta = now - last;
			last = now;
			progressRef.current += delta;
			if (progressRef.current >= durationMs) {
				nextItem();
			} else {
				rafRef.current = requestAnimationFrame(step);
			}
		};
		rafRef.current = requestAnimationFrame(step);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, playing, catIdx, itemIdx, durationMs]);

	function nextItem() {
		progressRef.current = 0;
		if (itemIdx < items.length - 1) {
			setItemIdx((i) => i + 1);
		} else if (catIdx < categories.length - 1) {
			setCatIdx((c) => c + 1);
			setItemIdx(0);
		} else {
			onClose();
		}
	}

	function prevItem() {
		progressRef.current = 0;
		if (itemIdx > 0) {
			setItemIdx((i) => i - 1);
		} else if (catIdx > 0) {
			const prevItems = categories[catIdx - 1]?.items ?? [];
			setCatIdx((c) => c - 1);
			setItemIdx(Math.max(0, prevItems.length - 1));
		}
	}

	function onPointerDown() {
		downRef.current = true;
		setPlaying(false);
	}
	function onPointerUp() {
		downRef.current = false;
		setPlaying(true);
	}

	function onTapZone(e: React.MouseEvent<HTMLDivElement>) {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		if (x < rect.width * 0.35) prevItem();
		else nextItem();
	}

	function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
		const t = e.touches[0];
		touchStart.current = { x: t.clientX, y: t.clientY };
	}
	function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
		if (!touchStart.current) return;
		const t = e.changedTouches[0];
		const dx = t.clientX - touchStart.current.x;
		const dy = t.clientY - touchStart.current.y;
		touchStart.current = null;
		if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
			if (dx > 0) prevItem();
			else nextItem();
		}
	}

	if (!open || !item) return null;

	const pct = Math.min(100, (progressRef.current / durationMs) * 100);

	return (
		<div className="fixed inset-0 z-[70] bg-black/95 text-white">
			{/* Top bar: progress + close */}
			<div className="absolute top-0 left-0 right-0 p-3 space-y-2">
				{/* progress bars por cada item de la categoría actual */}
				<div className="flex gap-1">
					{items.map((_, i) => (
						<div key={i} className="h-1 flex-1 bg-white/20 rounded">
							<div
								className="h-full bg-white rounded transition-[width]"
								style={{
									width:
										i < itemIdx ? "100%" : i === itemIdx ? `${pct}%` : "0%",
								}}
							/>
						</div>
					))}
				</div>
				{/* header mini: label de categoría y botón cerrar */}
				<div className="flex items-center justify-between">
					<div className="text-sm opacity-80">{categories[catIdx]?.label}</div>
					<button
						onClick={onClose}
						className="px-2 py-1 rounded-lg border border-white/20 text-white/80 hover:text-white"
					>
						Cerrar ✕
					</button>
				</div>
			</div>

			{/* Media */}
			<div
				className="absolute inset-0 grid place-items-center select-none"
				onMouseDown={onPointerDown}
				onMouseUp={onPointerUp}
				onMouseLeave={() => downRef.current && onPointerUp()}
				onTouchStartCapture={() => setPlaying(false)}
				onTouchEndCapture={() => setPlaying(true)}
			>
				<img
					src={item.src}
					alt={item.caption || "story"}
					className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
					draggable={false}
				/>
			</div>

			{/* Tap zones L/R */}
			<div
				className="absolute inset-0"
				onClick={onTapZone}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
			/>

			{/* Play/Pause */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
				<button
					onClick={() => setPlaying((p) => !p)}
					className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white"
				>
					{playing ? "Pausar" : "Reanudar"}
				</button>
			</div>
		</div>
	);
}

/* ------------------------ Grids tipo Instagram --------------------------- */

function InstaGrid({
	media,
	onOpen,
	ratio = "aspect-[4/5]",
}: {
	media: MediaItem[];
	onOpen: (index: number) => void;
	ratio?: string;
}) {
	if (!media?.length) return null;
	return (
		<div className="grid gap-1.5 grid-cols-3 sm:gap-2">
			{media.map((m, i) => (
				<button
					key={`${m.src}-${i}`}
					onClick={() => onOpen(i)}
					className="group relative block"
					title={m.caption || "Abrir"}
				>
					<img
						src={m.src}
						alt={m.caption || `media-${i + 1}`}
						className={classNames("w-full object-cover", ratio, "rounded-lg")}
						loading="lazy"
					/>
					<div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
						<span className="hidden sm:inline text-white/90 text-xs font-medium">
							{m.kind === "post" ? "Post" : "Foto"} • click para ampliar
						</span>
					</div>
				</button>
			))}
		</div>
	);
}

/* ----------------------------- Tabs simple ------------------------------- */

type TabId = "fotos" | "posts" | "info";

function Tabs({
	value,
	onChange,
	hasPosts,
}: {
	value: TabId;
	onChange: (t: TabId) => void;
	hasPosts: boolean;
}) {
	return (
		<div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
			{[
				{ id: "fotos", label: "Fotos" },
				...(hasPosts ? [{ id: "posts", label: "Publicaciones" as const }] : []),
				{ id: "info", label: "Información" },
			].map((t) => (
				<button
					key={t.id}
					onClick={() => onChange(t.id as TabId)}
					className={classNames(
						"px-4 py-2 text-sm font-medium",
						value === t.id
							? "border-b-2 border-slate-900 dark:border-white"
							: "text-slate-500 dark:text-slate-400",
					)}
				>
					{t.label}
				</button>
			))}
		</div>
	);
}

/* ------------------------------ Main page -------------------------------- */

export default function ProfileDetailPage() {
	const { id } = useParams<{ id: string }>();
	const perfil = useMemo(() => (id ? getProfileById(id) : undefined), [id]);

	if (!perfil) {
		return (
			<main className="mx-auto w-full max-w-[1000px] px-6 py-12">
				<h1 className="text-xl font-semibold">Perfil no encontrado</h1>
				<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
					El anuncio solicitado no existe o fue retirado.
				</p>
				<Link to="/" className="mt-4 inline-block underline">
					Volver al inicio
				</Link>
			</main>
		);
	}

	const postsRaw = getPostsByPerfil(perfil.id);
	const fotosMedia: MediaItem[] = perfil.fotos.map((f) => ({
		src: f,
		caption: perfil.nombre,
		kind: "foto",
	}));
	const postsMedia: MediaItem[] = postsRaw.flatMap((p) =>
		p.media.map((m) => ({ src: m, caption: p.caption, kind: "post" as const })),
	);
	const hasPosts = postsMedia.length > 0;

	// Stories state
	const [showStories, setShowStories] = useState(false);
	const [storyCatIndex, setStoryCatIndex] = useState(0);
	const [storyItemIndex, setStoryItemIndex] = useState(0);

	const openStories = (cat: number, item: number) => {
		setStoryCatIndex(cat);
		setStoryItemIndex(item);
		setShowStories(true);
	};

	// Lightbox fotos/posts (si ya lo tenías, puedes mantenerlo aparte)

	const [tab, setTab] = useState<TabId>("fotos");

	return (
		<main className="mx-auto w-full px-6 py-6 sm:py-8 space-y-8">
			{/* Back + username header */}
			<div className="-mx-6 px-6 flex items-center justify-between">
				<Link to="/" className="text-sm text-slate-500 hover:underline">
					← Volver
				</Link>
				<div className="text-sm text-slate-500 dark:text-slate-400">
					#{perfil.id}
				</div>
			</div>

			{/* Encabezado perfil (igual que tenías) */}
			<section className="flex items-start gap-5">
				<div className="w-28 h-28 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
					<img
						src={perfil.fotos[0]}
						alt={perfil.nombre}
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="flex-1">
					<h1 className="text-2xl font-bold">{perfil.nombre}</h1>
					<div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
						{perfil.edad} años • {perfil.ciudad} •{" "}
						{perfil.categorias.join(", ")}
					</div>

					<div className="mt-2 flex flex-wrap gap-2 text-xs">
						{perfil.verified && (
							<span className="px-2 py-1 rounded-full bg-emerald-600 text-white">
								Verificada
							</span>
						)}
						{perfil.emailVerified && (
							<span className="px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-800">
								Email verificado
							</span>
						)}
						{perfil.whatsappVerified && (
							<span className="px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-800">
								WhatsApp verificado
							</span>
						)}
						{perfil.idVerified && (
							<span className="px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-800">
								ID verificada
							</span>
						)}
					</div>

					<div className="mt-3 font-semibold">
						${perfil.precioMin.toLocaleString()} – $
						{perfil.precioMax.toLocaleString()}
					</div>

					<div className="mt-4 flex flex-wrap gap-2">
						{perfil.contacto.map((c) => (
							<button
								key={c}
								className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm"
							>
								{c}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* ⭐️ Stories por categorías */}
			{!!perfil.stories?.length && (
				<StoryBar
					categories={perfil.stories}
					onOpen={(cat, item) => openStories(cat, item)}
				/>
			)}

			{/* Tabs */}
			<Tabs value={tab} onChange={setTab} hasPosts={hasPosts} />

			{/* Content */}
			{tab === "fotos" && (
				<section className="space-y-3">
					<InstaGrid
						media={fotosMedia}
						onOpen={() => {}}
						ratio="aspect-[4/5]"
					/>
				</section>
			)}

			{tab === "posts" && hasPosts && (
				<section className="space-y-3">
					<InstaGrid
						media={postsMedia}
						onOpen={() => {}}
						ratio="aspect-[4/5]"
					/>
				</section>
			)}

			{tab === "info" && (
				<section className="grid sm:grid-cols-2 gap-6">
					<div>
						<h3 className="font-semibold mb-2">Características</h3>
						<ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
							{perfil.apariencia && <li>Apariencia: {perfil.apariencia}</li>}
							{perfil.estatura && <li>Estatura: {perfil.estatura}</li>}
							{perfil.pecho && <li>Pecho: {perfil.pecho}</li>}
							{perfil.pubis && <li>Pubis: {perfil.pubis}</li>}
							<li>Atiende: {perfil.atencionA.join(", ")}</li>
							<li>Modalidades: {perfil.categorias.join(", ")}</li>
							<li>Lugar: {perfil.lugar.join(", ")}</li>
							{perfil.tags?.length ? (
								<li>Tags: {perfil.tags.join(", ")}</li>
							) : null}
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-2">Disponibilidad</h3>
						<p className="text-sm text-slate-700 dark:text-slate-300">
							(Pendiente) Horarios de disponibilidad.{" "}
							<span className="opacity-60">Configurable en el panel.</span>
						</p>
					</div>
					{perfil.bio && (
						<div className="sm:col-span-2">
							<h3 className="font-semibold mb-2">Acerca de</h3>
							<p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
								{perfil.bio}
							</p>
						</div>
					)}
				</section>
			)}

			{/* Viewer de Stories */}
			<StoryViewer
				open={showStories}
				onClose={() => setShowStories(false)}
				categories={perfil.stories || []}
				startCat={storyCatIndex}
				startItem={storyItemIndex}
				durationMs={5000} // 5s por item
			/>

			{/* CTA flotante en móvil */}
			<div className="fixed bottom-4 left-0 right-0 sm:hidden px-4 z-40">
				<button className="w-full rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-3 font-semibold shadow-lg">
					Contactar
				</button>
			</div>
		</main>
	);
}
