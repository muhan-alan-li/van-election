import { useMemo, useState } from "preact/hooks";
import { CANDIDATES, candidateById } from "../data/index.js";
import { OFFICES, SLATES } from "../data/election.js";
import { QUESTIONS, type Question } from "../data/questions.js";
import type { Candidate, OfficeId } from "../data/types.js";
import { SourceLink } from "../components/ui.tsx";
import { CandidatePanel } from "./pages.tsx";
import { toggleShortlist, useShortlist } from "../shortlist.js";

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

interface Line {
    candidate: Candidate;
    agrees: string[];
    disagrees: string[];
    unknown: number;
    relevant: number;
}

/** How one candidate lines up with the voter's answers on this office's issues. */
function lineFor(c: Candidate, answers: Record<string, Answer>): Line {
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

function ShortlistButton({ id, name }: { id: string; name: string }) {
    const shortlist = useShortlist();
    const saved = shortlist.includes(id);
    return (
        <button
            type="button"
            class={`shortlist-btn${saved ? " is-saved" : ""}`}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${name} from your shortlist` : `Add ${name} to your shortlist`}
            title={saved ? "Remove from shortlist" : "Add to shortlist"}
            onClick={() => toggleShortlist(id)}
        >
            <span aria-hidden="true">{saved ? "★" : "☆"}</span>
        </button>
    );
}

function CandidateRow({ line, onOpen }: { line: Line; onOpen: (id: string) => void }) {
    const { candidate } = line;
    const showWhy = line.relevant > 0;
    return (
        <li class="match-row">
            <div class="match-row-head">
                <button
                    type="button"
                    class="match-row-open"
                    aria-haspopup="dialog"
                    onClick={() => onOpen(candidate.id)}
                >
                    <span class="match-row-name">{candidate.name}</span>
                    <span class="match-row-meta">
                        Ballot #{candidate.ballot} · {candidate.party}
                    </span>
                </button>
                <ShortlistButton id={candidate.id} name={candidate.name} />
            </div>
            {showWhy && (
                <p class="match-row-why">
                    {line.agrees.length > 0 && (
                        <>
                            <span class="match-tag match-tag-yes">Agrees</span> {line.agrees.join(", ")}
                        </>
                    )}
                    {line.agrees.length > 0 && line.disagrees.length > 0 && <br />}
                    {line.disagrees.length > 0 && (
                        <>
                            <span class="match-tag match-tag-no">Disagrees</span> {line.disagrees.join(", ")}
                        </>
                    )}
                    {line.agrees.length === 0 && line.disagrees.length === 0 && (
                        <>
                            <span class="match-tag match-tag-none">No position found</span> on the{" "}
                            {line.relevant} issue{line.relevant === 1 ? "" : "s"} you answered
                        </>
                    )}
                </p>
            )}
        </li>
    );
}

export function MatchPage() {
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [hideUnknown, setHideUnknown] = useState(false);
    const [openId, setOpenId] = useState<string | null>(null);

    const answeredCount = Object.keys(answers).length;
    const selected = openId ? (candidateById.get(openId) ?? null) : null;

    const sections = useMemo(() => {
        const byOffice = new Map<OfficeId, Line[]>();
        for (const c of CANDIDATES) {
            const line = lineFor(c, answers);
            const list = byOffice.get(c.office) ?? [];
            list.push(line);
            byOffice.set(c.office, list);
        }
        return OFFICES.map((office) => {
            let lines = (byOffice.get(office.id) ?? []).sort(
                (a, b) => a.candidate.ballot - b.candidate.ballot,
            );
            if (answeredCount > 0 && hideUnknown) {
                lines = lines.filter(
                    (l) => l.relevant === 0 || l.agrees.length > 0 || l.disagrees.length > 0,
                );
            }
            return { office, lines };
        });
    }, [answers, answeredCount, hideUnknown]);

    const alignedCount = useMemo(() => {
        let n = 0;
        for (const c of CANDIDATES) {
            const line = lineFor(c, answers);
            if (line.agrees.length > 0 && line.disagrees.length === 0) n += 1;
        }
        return n;
    }, [answers]);

    const choose = (q: Question, answer: Answer) => {
        setAnswers((prev) => {
            const next = { ...prev };
            if (sameAnswer(prev[q.id], answer)) delete next[q.id];
            else next[q.id] = answer;
            return next;
        });
    };

    return (
        <>
            <p class="eyebrow">Find candidates</p>
            <h1>Pick the things that matter to you</h1>
            <p class="lede">
                Answer as many as you like, and skip anything you are not sure about. Each answer is a
                position a candidate or slate states in a platform we have read. This is not a rating: a
                candidate with no stated position is a gap in our information, not a disagreement. Star the
                names you want to keep and find them under Shortlist.
            </p>

            {answeredCount > 0 && (
                <div class="match-now" aria-live="polite">
                    <span class="match-now-counts">
                        <strong>{alignedCount}</strong> agree with you on every issue they state
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

            <h2 id="match-results">Candidates by office</h2>
            {answeredCount === 0 ? (
                <p class="empty">
                    Everyone running is listed below, grouped by the office they seek. Answer a question above
                    and each name will show where they line up with what you chose.
                </p>
            ) : (
                <>
                    <p class="count" aria-live="polite">
                        {answeredCount} of {QUESTIONS.length} answered
                    </p>
                    <label class="match-hide">
                        <input
                            type="checkbox"
                            checked={hideUnknown}
                            onChange={(e) => setHideUnknown((e.target as HTMLInputElement).checked)}
                        />
                        Hide candidates with no stated position
                    </label>
                </>
            )}

            {sections.map(({ office, lines }) => (
                <section class="match-group" key={office.id} aria-label={office.title}>
                    <h3 class="match-group-title">
                        {office.title}{" "}
                        <span class="match-count">
                            {office.voteFor} · {lines.length} candidate{lines.length === 1 ? "" : "s"}
                        </span>
                    </h3>
                    {lines.length === 0 ? (
                        <p class="empty">No candidates to show with these settings.</p>
                    ) : (
                        <ul class="match-list">
                            {lines.map((line) => (
                                <CandidateRow key={line.candidate.id} line={line} onOpen={setOpenId} />
                            ))}
                        </ul>
                    )}
                </section>
            ))}

            {selected && <CandidatePanel candidate={selected} onClose={() => setOpenId(null)} />}
        </>
    );
}
