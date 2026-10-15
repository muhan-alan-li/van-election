import { useEffect, useRef } from "preact/hooks";
import { OFFICES, SLATES } from "../data/election.js";
import { candidateHref } from "../router.js";
import { Badge, SourceLink } from "./ui.tsx";
import { Arguments } from "./arguments.tsx";
import type { Candidate, Slate } from "../data/types.js";

/** Ballot affiliations that differ from the slate's published name. */
const SLATE_ALIASES: Record<string, string> = { OneCity: "onecity" };

function slateFor(party: string) {
    return SLATES.find((s) => s.name === party || s.id === SLATE_ALIASES[party]);
}

/** Every source behind a candidate profile, listed once each. */
function sourcesFor(c: Candidate): { label: string; url: string }[] {
    const seen = new Map<string, string>();
    for (const item of c.platform) seen.set(item.sourceUrl, item.sourceLabel);
    for (const source of c.furtherReading ?? []) seen.set(source.url, source.label);
    if (c.website && !seen.has(c.website)) seen.set(c.website, "Campaign website or official page");
    return [...seen].map(([url, label]) => ({ url, label }));
}

/** Sources behind a side panel: the candidate's own, plus the slate platform. */
function panelSources(c: Candidate, slate?: Slate): { label: string; url: string }[] {
    const out = sourcesFor(c);
    if (slate && !out.some((s) => s.url === slate.sourceUrl)) {
        out.push({ url: slate.sourceUrl, label: `${slate.name} platform` });
    }
    return out;
}

/** Compact issue block used inside the side panel. */
function BriefIssue({
    title,
    detail,
    delivery,
    forArgs,
    against,
    scope,
    sourceUrl,
    sourceLabel,
}: {
    title: string;
    detail: string;
    delivery?: string;
    forArgs: string[];
    against: string[];
    scope?: "candidate" | "slate";
    sourceUrl?: string;
    sourceLabel?: string;
}) {
    return (
        <section class="panel-issue">
            <h4 class="panel-issue-title">{title}</h4>
            {scope === "slate" && <Badge tone="noev">Shared party commitment</Badge>}
            <p>
                {detail}
                {delivery ? ` ${delivery}` : ""}
            </p>
            <Arguments forArgs={forArgs} against={against} />
            {sourceUrl && (
                <p class="src">
                    <SourceLink href={sourceUrl}>{sourceLabel ?? "Source"}</SourceLink>
                </p>
            )}
        </section>
    );
}

/** Side panel with a brief profile. Opens from a candidate row. */
export function CandidatePanel({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (el && !el.open) el.showModal();
    }, []);

    const office = OFFICES.find((o) => o.id === candidate.office)!;
    const slate = slateFor(candidate.party);
    const { analysis } = candidate;
    const sources = panelSources(candidate, slate);

    return (
        <dialog
            ref={ref}
            class="claim-panel candidate-panel"
            aria-label={`${candidate.name}, ${office.title}`}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === ref.current) ref.current?.close();
            }}
        >
            <div class="claim-panel-toolbar">
                <span>
                    Ballot #{candidate.ballot} · {office.title} · {candidate.party}
                </span>
                <button
                    type="button"
                    aria-label={`Close ${candidate.name} details`}
                    onClick={() => ref.current?.close()}
                >
                    Close <span aria-hidden="true">✕</span>
                </button>
            </div>

            <h2>{candidate.name}</h2>
            <p class="sub">
                {candidate.incumbentDetail ?? (candidate.incumbent ? "Incumbent" : "Challenger")}
            </p>
            <p class="lede">{analysis.summary}</p>

            {analysis.reviewed ? (
                <>
                    <h3>Where they stand</h3>
                    {candidate.platform.map((issue, i) => (
                        <BriefIssue
                            key={i}
                            title={issue.title}
                            detail={issue.detail}
                            delivery={issue.delivery}
                            forArgs={issue.for}
                            against={issue.against}
                            scope={issue.scope}
                            sourceUrl={issue.sourceUrl}
                            sourceLabel={issue.sourceLabel}
                        />
                    ))}
                    <h3>What to check</h3>
                    {analysis.recordNote && <p>{analysis.recordNote}</p>}
                    {analysis.openQuestions.length > 0 && (
                        <ul>
                            {analysis.openQuestions.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    )}
                </>
            ) : slate ? (
                <>
                    <h3>Shared {slate.name} platform</h3>
                    {slate.pillars.map((pillar, i) => (
                        <BriefIssue
                            key={i}
                            title={pillar.title}
                            detail={pillar.detail}
                            forArgs={pillar.for}
                            against={pillar.against}
                        />
                    ))}
                </>
            ) : (
                <p>
                    No shared platform is on file for this candidate, and we have not read one of their own.
                    Check the official candidate card for their material.
                </p>
            )}

            <p class="src">
                {sources.map((s, i) => (
                    <span key={s.url}>
                        {i > 0 && " · "}
                        <SourceLink href={s.url}>{s.label}</SourceLink>
                    </span>
                ))}
                {" · "}
                <a href={candidateHref(candidate.id)}>Full profile</a>
            </p>
        </dialog>
    );
}
