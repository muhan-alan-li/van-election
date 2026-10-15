import { SLATES } from "./election.js";
import { QUESTIONNAIRE_RECORDS } from "./questionnaire-records.js";
import type { Candidate, PlatformItem } from "./types.js";

export interface QuestionnaireProfile {
    platform: PlatformItem[];
    summary?: string;
    furtherReading?: { label: string; url: string }[];
}

function councilPlatform(c: Candidate): PlatformItem[] {
    if (c.office !== "council") return [];
    const slate = SLATES.find((s) => s.name === c.party || (s.id === "onecity" && c.party === "OneCity"));
    if (slate)
        return slate.pillars.map((p) => ({
            title: p.title,
            detail: p.detail,
            for: p.for,
            against: p.against,
            scope: "slate",
            sourceLabel: `${slate.name} shared platform`,
            sourceUrl: slate.sourceUrl,
        }));
    if (c.party === "TrueBlue Vancouver")
        return [
            {
                title: "Shared council questionnaire response",
                detail: "Supports a 2027 tax freeze and stronger public drug-use restrictions. Supports low-rise and transit-oriented housing, but opposes expanding City-owned or co-operative housing. Opposes funding more police positions.",
                sourceLabel: "Side Street — TrueBlue party reply",
                sourceUrl: "https://sidestreetvancouver.ca/election/candidate-responses/#trueblue-vancouver",
                scope: "slate",
                for: [],
                against: [],
            },
        ];
    return [];
}

/** Finalize profiles using the agreed source set; do not alter questionnaire matching. */
export function withQuestionnaireProfile(c: Candidate): Candidate {
    const extra = QUESTIONNAIRE_RECORDS[c.id];
    const initial = c.analysis.reviewed ? c.platform : councilPlatform(c);
    const platform = [...initial, ...(extra?.platform ?? [])];
    const furtherReading = [...(c.furtherReading ?? []), ...(extra?.furtherReading ?? [])];
    if (platform.length === 0)
        return {
            ...c,
            furtherReading,
            platform: [],
            analysis: {
                ...c.analysis,
                summary:
                    "No individual policy commitments were found in the sources reviewed for this guide. The official candidate listing is available below.",
                openQuestions: [],
                reviewed: false,
            },
        };

    const hadIndividual = c.analysis.reviewed && c.platform.some((p) => p.scope !== "slate");
    const hasIndividual = platform.some((p) => p.scope !== "slate");
    const personal = platform.find((p) => p.scope !== "slate");
    const summary =
        extra?.summary ??
        (hadIndividual
            ? c.analysis.summary
            : hasIndividual && personal
              ? `${personal.title}: ${personal.detail}`
              : `${c.party}'s shared commitments are shown below. No separate personal policy response was found in the sources reviewed.`);

    return {
        ...c,
        platform,
        furtherReading,
        gist: summary,
        website: c.website,
        analysis: {
            ...c.analysis,
            summary,
            openQuestions: [
                ...(c.analysis.reviewed ? c.analysis.openQuestions : []),
                ...(!c.analysis.reviewed
                    ? ["Which commitments would this candidate prioritize, and how would they be funded?"]
                    : []),
            ].filter((q) => (hasIndividual ? !q.includes("prioritize personally") : true)),
            reviewed: true,
            reviewedOn: extra?.platform.length || !c.analysis.reviewed ? "2026-10-14" : c.analysis.reviewedOn,
        },
    };
}
