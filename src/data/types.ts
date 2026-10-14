export type OfficeId = "mayor" | "council" | "park" | "school";

export interface Office {
    id: OfficeId;
    title: string;
    seats: number;
    voteFor: string;
    description: string;
}

/**
 * One campaign promise, written for voters rather than for policy specialists.
 * Each issue carries the arguments on both sides so readers can judge for themselves.
 */
export interface PlatformItem {
    /** Plain-language name for the topic, such as "Public safety and drug use". */
    title: string;
    /** What the candidate says they will do. Two or three short sentences. */
    detail: string;
    /** What would have to happen for the promise to work. Optional. */
    delivery?: string;
    /** Arguments people make in support of this promise. */
    for: string[];
    /** Arguments people make against this promise. */
    against: string[];
    sourceLabel: string;
    sourceUrl: string;
    /** "candidate" (default) = this person's own promise. "slate" = a shared party position. */
    scope?: "candidate" | "slate";
}

export interface CandidateAnalysis {
    /** The short version: two or three short sentences a voter can act on. */
    summary: string;
    /** What voters can check later — votes cast, budgets passed, offices held. */
    recordNote?: string;
    /** Questions the platform leaves open. */
    openQuestions: string[];
    reviewed: boolean;
    reviewedOn?: string;
}

export interface Candidate {
    id: string;
    ballot: number;
    name: string;
    office: OfficeId;
    party: string;
    incumbent: boolean;
    incumbentDetail?: string;
    /** One short line for tables and side panels, when a full profile exists. */
    gist?: string;
    website?: string;
    platform: PlatformItem[];
    analysis: CandidateAnalysis;
}

export interface Slate {
    id: string;
    name: string;
    website: string;
    running: Partial<Record<OfficeId, number>>;
    pillars: {
        title: string;
        detail: string;
        /** Brief arguments shown on a candidate's side panel. */
        for: string[];
        against: string[];
    }[];
    sourceUrl: string;
}

export interface ElectionMeta {
    id: string;
    title: string;
    jurisdiction: string;
    votingDay: string;
    advanceVoting: string[];
    nominationClose: string;
    officialHub: string;
    candidateListUrl: string;
    planYourVoteUrl: string;
    totalCandidates: number;
    generatedOn: string;
    coverageNote: string;
}
