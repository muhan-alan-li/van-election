import { SLATES } from "./data/election.js";
import { QUESTIONS, type Question } from "./data/questions.js";
import type { Candidate } from "./data/types.js";

export type Side = "a" | "b";

/**
 * What the voter told us. `want` is the position they back, `reject` the one they
 * oppose. A single-position question leaves one of the two empty.
 */
export interface Answer {
    want: Side | null;
    reject: Side | null;
}

/** The answers a question offers, given how many positions we found for it. */
export function answerFor(q: Question, side: Side): Answer {
    if (q.options.length > 1) return { want: side, reject: side === "a" ? "b" : "a" };
    return side === "a" ? { want: "a", reject: null } : { want: null, reject: "a" };
}

/** Which side the voter picked, if any. One-sided "no" is stored as a rejection. */
export function pickedFor(q: Question, answers: Record<string, Answer>): Side | undefined {
    const chosen = answers[q.id];
    if (!chosen) return undefined;
    if (q.options.length > 1) return chosen.want ?? undefined;
    return chosen.want === "a" ? "a" : "b";
}

/** Ballot affiliations that differ from the slate's published name. */
const SLATE_ALIASES: Record<string, string> = { OneCity: "onecity" };

function slateIdFor(party: string): string | undefined {
    return SLATES.find((s) => s.name === party || s.id === SLATE_ALIASES[party])?.id;
}

/**
 * Which side of a question a candidate states, from the source we have.
 * Mayors are read from their own platform. Everyone else is read from their slate.
 * "none" means we found no stated position. It never means they disagree.
 */
export function stanceFor(c: Candidate, q: Question): Side | "none" {
    const inA = q.candidatesA?.includes(c.id) ?? false;
    const inB = q.candidatesB?.includes(c.id) ?? false;

    if (c.office === "mayor") {
        if (inA) return "a";
        if (inB) return "b";
        return "none";
    }
    if (inA) return "a";
    if (inB) return "b";

    const slate = slateIdFor(c.party);
    if (!slate) return "none";
    if (q.slatesA.includes(slate)) return "a";
    if (q.slatesB?.includes(slate)) return "b";
    return "none";
}

export interface Line {
    candidate: Candidate;
    agrees: string[];
    disagrees: string[];
    unknown: number;
    relevant: number;
}

/** How one candidate lines up with the voter's answers on this office's issues. */
export function lineFor(c: Candidate, answers: Record<string, Answer>): Line {
    const agrees: string[] = [];
    const disagrees: string[] = [];
    let unknown = 0;
    let relevant = 0;
    for (const q of QUESTIONS) {
        const answer = answers[q.id];
        if (!answer || !q.offices.includes(c.office)) continue;
        relevant += 1;
        const stance = stanceFor(c, q);
        if (stance === "none") {
            unknown += 1;
            continue;
        }
        if (stance === answer.want) agrees.push(q.topic);
        else if (stance === answer.reject) disagrees.push(q.topic);
        else unknown += 1;
    }
    return { candidate: c, agrees, disagrees, unknown, relevant };
}
