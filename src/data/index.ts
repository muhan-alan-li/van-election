import { COUNCIL } from "./council.js";
import { MAYOR } from "./mayor.js";
import { PARK } from "./park.js";
import { SCHOOL } from "./school.js";
import type { Candidate } from "./types.js";

export const CANDIDATES: Candidate[] = [...MAYOR, ...COUNCIL, ...PARK, ...SCHOOL];

export const candidateById = new Map(CANDIDATES.map((c) => [c.id, c]));
