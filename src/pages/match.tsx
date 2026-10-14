import { useMemo, useState } from "preact/hooks";
import { CANDIDATES } from "../data/index.js";
import { OFFICES, SLATES } from "../data/election.js";
import { QUESTIONS, type Question } from "../data/questions.js";
import type { Candidate, OfficeId } from "../data/types.js";
import { Badge, SourceLink } from "../components/ui.tsx";
import { CandidatePanel } from "./pages.tsx";

type Side = "a" | "b";

/**
 * What the voter told us. `want` is the position they back, `reject` the one they
 * oppose. A single-position question leaves one of the two empty.
 */
interface Answer {
    want: Side | null;
    reject: Side | null;
}

/** The answers a question offers, given how many positions we found for it. */
function answerFor(q: Question, side: Side): Answer {
    if (q.options.length > 1) return { want: side, reject: side === "a" ? "b" : "a" };
    return side === "a" ? { want: "a", reject: null } : { want: null, reject: "a" };
}

function sameAnswer(a?: Answer, b?: Answer): boolean {
    return Boolean(a && b && a.want === b.want && a.reject === b.reject);
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
function stanceFor(c: Candidate, q: Question): Side | "none" {
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

interface Row {
    candidate: Candidate;
    agrees: string[];
    disagrees: string[];
    unknown: number;
}

interface Results {
    unanimous: Row[];
    partial: Row[];
    against: Row[];
    unknown: Row[];
    offices: OfficeId[];
}

export function buildResults(answers: Record<string, Answer>): Results {
    const answered = QUESTIONS.filter((q) => answers[q.id]);
    const offices = [...new Set(answered.flatMap((q) => q.offices))];

    const rows: Row[] = [];
    for (const c of CANDIDATES) {
        if (!offices.includes(c.office)) continue;
        const agrees: string[] = [];
        const disagrees: string[] = [];
        let unknown = 0;

        for (const q of answered) {
            // Skip issues that do not bear on this race.
            if (!q.offices.includes(c.office)) continue;
            const stance = stanceFor(c, q);
            if (stance === "none") {
                unknown += 1;
                continue;
            }
            const answer = answers[q.id];
            if (stance === answer.want) agrees.push(q.topic);
            else if (stance === answer.reject) disagrees.push(q.topic);
            else unknown += 1;
        }

        rows.push({ candidate: c, agrees, disagrees, unknown });
    }

    const byBallot = (a: Row, b: Row) => a.candidate.ballot - b.candidate.ballot;
    return {
        unanimous: rows.filter((r) => r.agrees.length > 0 && r.disagrees.length === 0).sort(byBallot),
        partial: rows.filter((r) => r.agrees.length > 0 && r.disagrees.length > 0).sort(byBallot),
        against: rows.filter((r) => r.agrees.length === 0 && r.disagrees.length > 0).sort(byBallot),
        unknown: rows
            .filter((r) => r.agrees.length === 0 && r.disagrees.length === 0 && r.unknown > 0)
            .sort(byBallot),
        offices,
    };
}

/** "Mayor, City Council and Park Board" */
function officeList(offices: OfficeId[]): string {
    const titles = offices.map((o) => OFFICES.find((x) => x.id === o)!.title);
    if (titles.length <= 1) return titles[0] ?? "";
    return `${titles.slice(0, -1).join(", ")} and ${titles[titles.length - 1]}`;
}

function MatchRow({ row, onOpen }: { row: Row; onOpen: (id: string) => void }) {
    const office = OFFICES.find((o) => o.id === row.candidate.office)!;
    return (
        <li class="match-row">
            <button
                type="button"
                class="match-row-open"
                aria-haspopup="dialog"
                onClick={() => onOpen(row.candidate.id)}
            >
                <span class="match-row-name">{row.candidate.name}</span>
                <span class="match-row-meta">
                    {office.title} · {row.candidate.party}
                </span>
            </button>
            <p class="match-row-why">
                {row.agrees.length > 0 && (
                    <>
                        <span class="match-tag match-tag-yes">Agrees</span> {row.agrees.join(", ")}
                    </>
                )}
                {row.agrees.length > 0 && row.disagrees.length > 0 && <br />}
                {row.disagrees.length > 0 && (
                    <>
                        <span class="match-tag match-tag-no">Disagrees</span> {row.disagrees.join(", ")}
                    </>
                )}
                {row.agrees.length === 0 && row.disagrees.length === 0 && (
                    <>
                        <span class="match-tag match-tag-none">No position found</span> on the {row.unknown}{" "}
                        issue{row.unknown === 1 ? "" : "s"} you answered
                    </>
                )}
            </p>
        </li>
    );
}

export function MatchPage() {
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [hideUnknown, setHideUnknown] = useState(false);
    const [openId, setOpenId] = useState<string | null>(null);

    const answeredCount = Object.keys(answers).length;
    const results = useMemo(() => buildResults(answers), [answers]);
    const selected = openId ? (CANDIDATES.find((c) => c.id === openId) ?? null) : null;

    const choose = (q: Question, answer: Answer) => {
        setAnswers((prev) => {
            const next = { ...prev };
            if (sameAnswer(prev[q.id], answer)) delete next[q.id];
            else next[q.id] = answer;
            return next;
        });
    };

    const groups: { key: string; title: string; rows: Row[] }[] = [
        {
            key: "unanimous",
            title: "Agrees with you on every issue they state",
            rows: results.unanimous,
        },
        {
            key: "partial",
            title: "Agrees with you on some issues",
            rows: results.partial,
        },
        {
            key: "against",
            title: "Takes the opposite position",
            rows: results.against,
        },
        {
            key: "unknown",
            title: "No stated position",
            rows: results.unknown,
        },
    ];

    return (
        <>
            <p class="eyebrow">Find candidates</p>
            <h1>Pick the things that matter to you</h1>
            <p class="lede">
                Answer as many as you like, and skip anything you do not care about. Each answer is a position
                a candidate or slate states in a platform we have read. This is not a rating: a candidate with
                no stated position is a gap in our information, not a disagreement.
            </p>

            {answeredCount > 0 && (
                <div class="match-now" aria-live="polite">
                    <span class="match-now-counts">
                        <strong>{results.unanimous.length}</strong> agree with you on every issue they state
                    </span>
                    <button
                        type="button"
                        class="match-jump"
                        onClick={() =>
                            document
                                .getElementById("match-results")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                    >
                        Show results ↓
                    </button>
                </div>
            )}

            <form class="match-form" onSubmit={(e) => e.preventDefault()}>
                {QUESTIONS.map((q) => {
                    const chosen = answers[q.id];
                    const twoSided = q.options.length > 1;
                    return (
                        <fieldset class="match-q" key={q.id}>
                            <legend>{q.prompt}</legend>
                            <div class="match-options">
                                {q.options.map((opt, i) => {
                                    const side: Side = i === 0 ? "a" : "b";
                                    return (
                                        <label class="match-option" key={side}>
                                            <input
                                                type="radio"
                                                name={q.id}
                                                checked={chosen?.want === side}
                                                onChange={() => choose(q, answerFor(q, side))}
                                            />
                                            <span>
                                                <strong>{opt.label}</strong>
                                                <span class="match-option-detail">{opt.detail}</span>
                                            </span>
                                        </label>
                                    );
                                })}
                                {!twoSided && q.opposite && (
                                    <label class="match-option">
                                        <input
                                            type="radio"
                                            name={q.id}
                                            checked={chosen?.reject === "a"}
                                            onChange={() => choose(q, answerFor(q, "b"))}
                                        />
                                        <span>
                                            <strong>{q.opposite.label}</strong>
                                            <span class="match-option-detail">{q.opposite.detail}</span>
                                        </span>
                                    </label>
                                )}
                            </div>
                            <p class="match-q-meta">
                                <SourceLink href={q.sourceUrl}>{q.sourceLabel}</SourceLink>
                                {q.note ? ` · ${q.note}` : ""}
                            </p>
                            {chosen && (
                                <button type="button" class="match-clear" onClick={() => choose(q, chosen)}>
                                    Clear this answer
                                </button>
                            )}
                        </fieldset>
                    );
                })}
            </form>

            <h2 id="match-results">Results</h2>
            {answeredCount === 0 ? (
                <p class="empty">
                    Answer a question above and the candidates will appear here, grouped by how they line up
                    with what you chose.
                </p>
            ) : (
                <>
                    <p class="count" aria-live="polite">
                        {answeredCount} of {QUESTIONS.length} answered · covering{" "}
                        {officeList(results.offices)}
                    </p>
                    <label class="match-hide">
                        <input
                            type="checkbox"
                            checked={hideUnknown}
                            onChange={(e) => setHideUnknown((e.target as HTMLInputElement).checked)}
                        />
                        Hide candidates with no stated position
                    </label>

                    {groups.map((g) =>
                        g.rows.length === 0 || (g.key === "unknown" && hideUnknown) ? null : (
                            <section class="match-group" key={g.key}>
                                <h3 class={`match-group-title match-group-${g.key}`}>
                                    {g.title}{" "}
                                    <span class="match-count">
                                        {g.rows.length} candidate{g.rows.length === 1 ? "" : "s"}
                                    </span>
                                </h3>
                                <ul class="match-list">
                                    {g.rows.map((row) => (
                                        <MatchRow key={row.candidate.id} row={row} onOpen={setOpenId} />
                                    ))}
                                </ul>
                            </section>
                        ),
                    )}
                </>
            )}

            {selected && <CandidatePanel candidate={selected} onClose={() => setOpenId(null)} />}
        </>
    );
}
