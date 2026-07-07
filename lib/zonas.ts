import { getCctNumeroRegex } from "./raf-config";

/**
 * Mapeo escuela → zona. Poblar cuando se conozca la asignación.
 */
const ESCUELA_A_ZONA: Record<number, number> = {};

/** Extrae el número de escuela del CCT */
export function getNumeroEscuela(cct: string): number | null {
  const match = cct.match(getCctNumeroRegex());
  if (!match) return null;
  const num = parseInt(match[1], 10);
  return num > 0 ? num : null;
}

/** Obtiene la zona de una escuela por su CCT. Devuelve null si no hay mapeo. */
export function getZonaFromCct(cct: string): number | null {
  const num = getNumeroEscuela(cct);
  if (num == null) return null;
  return ESCUELA_A_ZONA[num] ?? null;
}

/** Solo zonas que tienen escuelas asignadas (del mapeo) */
export const ZONAS_DISPONIBLES = [...new Set(Object.values(ESCUELA_A_ZONA))].sort((a, b) => a - b);
