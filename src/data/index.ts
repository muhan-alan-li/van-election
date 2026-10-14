import { COUNCIL } from "./council.js";
import { MAYOR } from "./mayor.js";
import { PARK } from "./park.js";
import { SCHOOL } from "./school.js";
import type { Candidate } from "./types.js";

export const CANDIDATES: Candidate[] = [...MAYOR, ...COUNCIL, ...PARK, ...SCHOOL];

export const candidateById = new Map(CANDIDATES.map((c) => [c.id, c]));

export function candidatesForOffice(office: Candidate["office"]): Candidate[] {
    return CANDIDATES.filter((c) => c.office === office).sort((a, b) => a.ballot - b.ballot);
}
