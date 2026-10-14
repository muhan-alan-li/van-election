import { COUNCIL } from "./council.js";
import { MAYOR } from "./mayor.js";
import { PARK } from "./park.js";
import { SCHOOL } from "./school.js";
import type { Candidate } from "./types.js";
import { withQuestionnaireProfile } from "./questionnaire-profiles.js";

export const CANDIDATES: Candidate[] = [...MAYOR, ...COUNCIL, ...PARK, ...SCHOOL].map(
    withQuestionnaireProfile,
);

export const candidateById = new Map(CANDIDATES.map((c) => [c.id, c]));
