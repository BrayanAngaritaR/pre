// src/lib/profile.ts
import { PERFILES, type Perfil, POSTS } from "../data";

export function getProfileById(id: string): Perfil | undefined {
	return PERFILES.find((p) => p.id === id);
}

export function getPostsByPerfil(id: string) {
	return POSTS.filter((x) => x.perfilId === id);
}
