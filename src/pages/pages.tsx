import { useEffect, useRef } from "preact/hooks";
import { CANDIDATES, candidateById } from "../data/index.js";
import { ELECTION, OFFICES, SLATES } from "../data/election.js";
import { candidateHref, matchHref } from "../router.js";
import { BackLink } from "../components/navigation.tsx";
import { Badge, SourceLink } from "../components/ui.tsx";
import type { Candidate, PlatformItem, Slate } from "../data/types.js";

export function HomePage() {
    return (
        <>
            <p class="eyebrow">{ELECTION.jurisdiction}</p>
            <h1>{ELECTION.title}</h1>
            <p class="lede">
                <strong>{ELECTION.votingDay}.</strong> Advance voting {ELECTION.advanceVoting.join(" · ")}.
                Answer a few questions about what matters to you, see how each of the {CANDIDATES.length}{" "}
                candidates lines up, and star the ones you want to keep.
            </p>
            <div class="cards">
                <a class="card" href={matchHref()}>
                    <strong>Find candidates</strong>
                    <div class="card-meta">
                        Pick the positions you back, skip the rest, and browse everyone running by office.
                    </div>
                </a>
                <a class="card" href="#/shortlist">
                    <strong>Your shortlist</strong>
                    <div class="card-meta">
                        The names you starred, grouped by office, saved on this device.
                    </div>
                </a>
            </div>
            <h2>Party platforms</h2>
            <p>The shared commitments that slate candidates run on.</p>
            <div class="cards">
                {SLATES.map((s) => (
                    <article key={s.id} class="card slate-card">
                        <strong>{s.name}</strong>
                        <ul class="slate-pillars">
                            {s.pillars.map((p) => (
                                <li key={p.title}>
                                    <strong>{p.title}</strong>
                                    <span>{p.detail}</span>
                                </li>
                            ))}
                        </ul>
                        <p class="slate-links">
                            <SourceLink href={s.sourceUrl}>Platform</SourceLink>
                        </p>
                    </article>
                ))}
            </div>
            <h2>Official sources</h2>
            <ul>
                <li>
                    <SourceLink href={ELECTION.officialHub}>City of Vancouver 2026 election hub</SourceLink>
                </li>
                <li>
                    <SourceLink href={ELECTION.candidateListUrl}>
                        Official nominated candidates list (PDF)
                    </SourceLink>
                </li>
                <li>
                    <SourceLink href={ELECTION.planYourVoteUrl}>
                        Plan Your Vote — candidate cards + contact links
                    </SourceLink>
                </li>
            </ul>
        </>
    );
}

/** Ballot affiliations that differ from the slate's published name. */
const SLATE_ALIASES: Record<string, string> = { OneCity: "onecity" };

function slateFor(party: string) {
    return SLATES.find((s) => s.name === party || s.id === SLATE_ALIASES[party]);
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
                <button type="button" onClick={() => ref.current?.close()}>
                    Close ✕
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
                {analysis.reviewed && (
                    <>
                        {" · "}
                        <a href={candidateHref(candidate.id)}>Full profile</a>
                    </>
                )}
            </p>
        </dialog>
    );
}

/** Compact issue block used inside the side panel. */
function BriefIssue({
    title,
    detail,
    delivery,
    forArgs,
    against,
}: {
    title: string;
    detail: string;
    delivery?: string;
    forArgs: string[];
    against: string[];
}) {
    return (
        <section class="panel-issue">
            <h4 class="panel-issue-title">{title}</h4>
            <p>
                {detail}
                {delivery ? ` ${delivery}` : ""}
            </p>
            <Arguments forArgs={forArgs} against={against} />
        </section>
    );
}

/** "2026-10-13" reads as "October 13, 2026". */
function longDate(iso?: string): string {
    if (!iso) return "an earlier date";
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

/** Every source behind a candidate profile, listed once each. */
function sourcesFor(c: Candidate): { label: string; url: string }[] {
    const seen = new Map<string, string>();
    for (const item of c.platform) seen.set(item.sourceUrl, item.sourceLabel);
    if (c.website && !seen.has(c.website)) seen.set(c.website, "Campaign website or official page");
    return [...seen].map(([url, label]) => ({ url, label }));
}

/** One campaign promise, with the arguments on both sides. */
/** The two sides of an issue. Both keep the same visual weight. */
export function Arguments({ forArgs, against }: { forArgs: string[]; against: string[] }) {
    if (forArgs.length === 0 && against.length === 0) return null;
    return (
        <div class="arg-cols">
            {forArgs.length > 0 && (
                <div class="arg-col arg-for">
                    <h4>Arguments for</h4>
                    <ul>
                        {forArgs.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </div>
            )}
            {against.length > 0 && (
                <div class="arg-col arg-against">
                    <h4>Arguments against</h4>
                    <ul>
                        {against.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

/** Sources behind a side panel: the candidate's own, plus the slate platform. */
function panelSources(c: Candidate, slate?: Slate): { label: string; url: string }[] {
    const out = sourcesFor(c);
    if (slate && !out.some((s) => s.url === slate.sourceUrl)) {
        out.push({ url: slate.sourceUrl, label: `${slate.name} platform` });
    }
    return out;
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
    const c = candidateById.get(id);
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

export function MethodologyPage() {
    return (
        <>
            <BackLink href="#/">Home</BackLink>
            <p class="eyebrow">How this guide works</p>
            <h1>Methodology</h1>
            <p class="lede">
                For every candidate we ask three questions: what do they promise, what does the record show,
                and what is still unknown?
            </p>

            <h2>How we work</h2>
            <p>
                Names, ballot numbers and ballot order come from the City of Vancouver's declaration of
                election by voting. We read platforms in campaign and slate publications and link each promise
                to the page we read it on. Records come from votes, offices held and official documents, dated
                and sourced.
            </p>
            <p>
                A <Badge tone="aligned">Reviewed</Badge> profile means we read the platform against its
                sources, and the page shows the date we did that. A <Badge tone="noev">Not reviewed</Badge>{" "}
                profile means the candidate is on the ballot but we have not read a platform yet. That is
                unknown, not negative.
            </p>

            <h2>Arguments for and against</h2>
            <p>
                Both lists follow the same rules: one plain sentence per argument, drawn from the campaign
                debate, the records we checked, and what the promise would require. We do not score the
                arguments or give one side more weight. They are what people in this campaign say. They are
                not our view, and we do not endorse, rank or recommend anyone.
            </p>

            <h2>The candidate finder</h2>
            <p>
                The finder asks about issues where candidates have stated a position. Answer the ones you care
                about and skip the rest. Every candidate is listed under the office they seek, in ballot
                order, with a note on where they line up with your answers. For mayor we read the candidate's
                own platform. Everywhere else the position belongs to their slate, not to the candidate
                personally. When we find no position, the candidate shows "no stated position". That is a gap
                in our information, never a disagreement. Each question shows what supporters and critics of
                the position say.
            </p>
            <p>
                Star the names you want to keep and they are saved on your device under Shortlist, grouped by
                office. The shortlist never leaves your browser.
            </p>

            <h2>Corrections</h2>
            <p>
                Election information changes fast in the final week. If something is wrong, check{" "}
                <SourceLink href={ELECTION.planYourVoteUrl}>Plan Your Vote</SourceLink> and the linked
                campaign source, then send us the URL.
            </p>
        </>
    );
}
