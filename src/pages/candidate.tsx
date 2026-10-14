import { candidateById } from "../data/index.js";
import { OFFICES } from "../data/election.js";
import { matchHref } from "../router.js";
import { BackLink } from "../components/navigation.tsx";
import { Badge, SourceLink } from "../components/ui.tsx";
import { Arguments } from "../components/arguments.tsx";
import type { Candidate, PlatformItem } from "../data/types.js";

/** "2026-10-13" reads as "October 13, 2026". */
function longDate(iso?: string): string {
    if (!iso) return "an earlier date";
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

function IssueCard({ issue }: { issue: PlatformItem }) {
    return (
        <article class="issue">
            <h3>{issue.title}</h3>
            {issue.scope === "slate" && <Badge tone="noev">Shared party commitment</Badge>}
            <p>
                {issue.detail}
                {issue.delivery ? ` ${issue.delivery}` : ""}
            </p>
            <Arguments forArgs={issue.for} against={issue.against} />
            <p class="src">
                <SourceLink href={issue.sourceUrl}>{issue.sourceLabel}</SourceLink>
            </p>
        </article>
    );
}

export function CandidatePage({ id }: { id: string }) {
    const c: Candidate | undefined = candidateById.get(id);
    if (!c)
        return (
            <p role="alert">
                Candidate not found. <a href="#/">Back to home</a>.
            </p>
        );
    const officeMeta = OFFICES.find((o) => o.id === c.office)!;
    const { analysis } = c;
    const sharedOnly = analysis.reviewed && c.platform.every((issue) => issue.scope === "slate");
    const status = c.incumbentDetail ?? (c.incumbent ? "Incumbent" : "Challenger");
    return (
        <>
            <BackLink href={matchHref()}>Find candidates</BackLink>
            <h1>{c.name}</h1>
            <p class="lede">{analysis.summary}</p>

            <dl class="facts">
                <div>
                    <dt>Office</dt>
                    <dd>
                        {officeMeta.title} — {officeMeta.voteFor}
                    </dd>
                </div>
                <div>
                    <dt>Ballot number</dt>
                    <dd>{c.ballot}</dd>
                </div>
                <div>
                    <dt>Slate or affiliation</dt>
                    <dd>{c.party}</dd>
                </div>
                <div>
                    <dt>Who they are</dt>
                    <dd>{status}</dd>
                </div>
                <div>
                    <dt>Our review</dt>
                    <dd>
                        {analysis.reviewed ? (
                            <>
                                <Badge tone="aligned">
                                    {sharedOnly ? "Shared platform reviewed" : "Reviewed"}
                                </Badge>{" "}
                                Checked against the sources on {longDate(analysis.reviewedOn)}.
                            </>
                        ) : (
                            <>
                                <Badge tone="noev">Limited information</Badge> No individual policy detail was
                                found in the sources reviewed.
                            </>
                        )}
                    </dd>
                </div>
                {c.website && (
                    <div>
                        <dt>Campaign link</dt>
                        <dd>
                            <SourceLink href={c.website}>Website or official page</SourceLink>
                        </dd>
                    </div>
                )}
            </dl>

            {analysis.reviewed ? (
                <>
                    <h2>Where {c.name} stands</h2>
                    {c.platform.map((issue, i) => (
                        <IssueCard key={i} issue={issue} />
                    ))}

                    <h2>What to check</h2>
                    {analysis.recordNote && <p>{analysis.recordNote}</p>}
                    {analysis.openQuestions.length > 0 && (
                        <ul>
                            {analysis.openQuestions.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <p>
                    <SourceLink href={c.website ?? "https://vancouver.ca/plan-your-vote/index.aspx"}>
                        Official candidate information
                    </SourceLink>
                </p>
            )}
            {c.furtherReading && c.furtherReading.length > 0 && (
                <p class="src">
                    {c.furtherReading.map((s, i) => (
                        <span key={s.url}>
                            {i > 0 && " · "}
                            <SourceLink href={s.url}>{s.label}</SourceLink>
                        </span>
                    ))}
                </p>
            )}
        </>
    );
}
