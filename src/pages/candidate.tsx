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
                                <Badge tone="aligned">Reviewed</Badge> Checked against the sources on{" "}
                                {longDate(analysis.reviewedOn)}.
                            </>
                        ) : (
                            <>
                                <Badge tone="noev">Not reviewed</Badge> We have not read a platform for this
                                candidate yet.
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
                c.platform.map((item, i) => (
                    <p key={i}>
                        {item.detail} <SourceLink href={item.sourceUrl}>{item.sourceLabel}</SourceLink>
                    </p>
                ))
            )}
        </>
    );
}
