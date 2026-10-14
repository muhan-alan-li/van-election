import { useMemo, useState } from "preact/hooks";
import { CANDIDATES, candidateById } from "../data/index.js";
import { OFFICES, SLATES } from "../data/election.js";
import { QUESTIONS, type Question } from "../data/questions.js";
import type { Candidate, OfficeId } from "../data/types.js";
import { SourceLink } from "../components/ui.tsx";
import { CandidatePanel } from "./pages.tsx";
import { OfficeTabs } from "../components/office-tabs.tsx";
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

/** Which side the voter picked, if any. One-sided "no" is stored as a rejection. */
function pickedFor(q: Question, answers: Record<string, Answer>): Side | undefined {
    const chosen = answers[q.id];
    if (!chosen) return undefined;
    if (q.options.length > 1) return chosen.want ?? undefined;
    return chosen.want === "a" ? "a" : "b";
}

function QuestionCard({
    q,
    picked,
    onPick,
    onToggle,
}: {
    q: Question;
    picked: Side | undefined;
    onPick: (side: Side) => void;
    onToggle: (side: Side) => void;
}) {
    const twoSided = q.options.length > 1;
    const yesOpt = q.options[0];
    const noOpt = twoSided ? q.options[1] : q.opposite!;
    return (
        <fieldset class="match-q">
            <legend>{q.prompt}</legend>
            <div class="match-yn">
                {(["a", "b"] as Side[]).map((side) => {
                    const yes = side === "a";
                    const opt = yes ? yesOpt : noOpt;
                    const points = yes ? q.for : q.against;
                    return (
                        <div class="match-col" key={side}>
                            <label class="match-option match-yesno">
                                <input
                                    type="radio"
                                    name={q.id}
                                    checked={picked === side}
                                    onChange={() => onPick(side)}
                                    onClick={() => {
                                        if (picked === side) onToggle(side);
                                    }}
                                />
                                <span class="match-verdict">{yes ? "Yes" : "No"}</span>
                            </label>
                            <section
                                class="match-analysis"
                                aria-label={`If you answer ${yes ? "yes" : "no"}: ${opt.label}`}
                            >
                                <h4>{yes ? "Yes" : "No"}</h4>
                                <ul>
                                    <li>{opt.detail}</li>
                                    {points.map((a, i) => (
                                        <li key={i}>{a}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    );
                })}
            </div>
            <p class="match-q-meta">
                {q.note}
                {q.learnMore.map((s) => (
                    <span key={s.url}>
                        {" · Learn more: "}
                        <SourceLink href={s.url}>{s.label}</SourceLink>
                    </span>
                ))}
            </p>
        </fieldset>
    );
}

export function MatchPage() {
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [hideUnknown, setHideUnknown] = useState(false);
    const [openId, setOpenId] = useState<string | null>(null);
    const [officeTab, setOfficeTab] = useState<OfficeId>("mayor");
    /** Which question the carousel shows. Past the last one is the answers review. */
    const [step, setStep] = useState(0);
    /** Jumped here from the review list: offer a way back. */
    const [fromReview, setFromReview] = useState(false);

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

    const choose = (q: Question, answer: Answer) => {
        setAnswers((prev) => ({ ...prev, [q.id]: answer }));
    };

    const clearAnswer = (q: Question) => {
        setAnswers((prev) => {
            if (!(q.id in prev)) return prev;
            const next = { ...prev };
            delete next[q.id];
            return next;
        });
    };

    const lastStep = QUESTIONS.length - 1;
    const reviewing = step > lastStep;

    const goStep = (i: number) => {
        setStep(Math.max(0, Math.min(i, QUESTIONS.length)));
    };

    const jumpFromReview = (i: number) => {
        setFromReview(true);
        goStep(i);
    };

    const backToReview = () => {
        setFromReview(false);
        goStep(QUESTIONS.length);
    };

    const current = reviewing ? null : QUESTIONS[step];
    const currentPicked = current ? pickedFor(current, answers) : undefined;

    const statusFor = (q: Question): { label: string; tone: string } => {
        const picked = pickedFor(q, answers);
        if (picked === "a") return { label: "Yes", tone: "match-tag-yes" };
        if (picked === "b") return { label: "No", tone: "match-tag-no" };
        return { label: "Skipped", tone: "match-tag-none" };
    };

    return (
        <>
            <p class="eyebrow">Find candidates</p>
            <h1>What matters to you?</h1>
            <p class="lede">Answer a few questions. Leave the rest blank. Star the names you want to keep.</p>

            <section id="match-quiz" aria-label="Questions">
                {!reviewing && current ? (
                    <>
                        <p class="quiz-count" aria-live="polite">
                            Question {step + 1} of {QUESTIONS.length}
                        </p>
                        <div
                            class="quiz-progress"
                            role="progressbar"
                            aria-valuenow={step + 1}
                            aria-valuemin={1}
                            aria-valuemax={QUESTIONS.length}
                            aria-label={`Question ${step + 1} of ${QUESTIONS.length}`}
                        >
                            <div
                                class="quiz-progress-fill"
                                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                        <QuestionCard
                            key={current.id}
                            q={current}
                            picked={currentPicked}
                            onPick={(side) => choose(current, answerFor(current, side))}
                            onToggle={() => clearAnswer(current)}
                        />
                        <div class="quiz-nav">
                            <button
                                type="button"
                                class="quiz-btn"
                                disabled={step === 0 && !fromReview}
                                onClick={() => {
                                    if (step === 0 && fromReview) backToReview();
                                    else goStep(step - 1);
                                }}
                            >
                                ← Back
                            </button>
                            {fromReview && (
                                <button type="button" class="quiz-btn" onClick={backToReview}>
                                    Your answers
                                </button>
                            )}
                            <span class="quiz-spacer" />
                            <button type="button" class="quiz-btn quiz-next" onClick={() => goStep(step + 1)}>
                                {step === lastStep ? "See your answers ↓" : "Next →"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>Your answers</h2>
                        <p class="count" aria-live="polite">
                            {answeredCount} of {QUESTIONS.length} answered
                            {answeredCount < QUESTIONS.length ? " — the rest skipped" : ""}
                        </p>
                        <ul class="quiz-review-list">
                            {QUESTIONS.map((q, i) => {
                                const status = statusFor(q);
                                return (
                                    <li key={q.id}>
                                        <button type="button" onClick={() => jumpFromReview(i)}>
                                            <span class="quiz-review-topic">{q.topic}</span>
                                            <span class={`match-tag ${status.tone}`}>{status.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <button
                            type="button"
                            class="quiz-btn quiz-next"
                            onClick={() =>
                                document
                                    .getElementById("match-results")
                                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                            }
                        >
                            Show candidates ↓
                        </button>
                    </>
                )}
            </section>

            <h2 id="match-results">Candidates by office</h2>
            {answeredCount === 0 ? (
                <p class="empty">
                    Everyone running is listed below by office. Answer above to see who lines up with you.
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

            <OfficeTabs
                tabs={sections.map(({ office, lines }) => ({
                    id: office.id,
                    title: office.title,
                    count: lines.length,
                }))}
                active={officeTab}
                onChange={setOfficeTab}
            />

            {sections.map(({ office, lines }) =>
                office.id !== officeTab ? null : (
                    <section
                        class="match-group"
                        key={office.id}
                        role="tabpanel"
                        id={`office-panel-${office.id}`}
                        aria-labelledby={`office-tab-${office.id}`}
                    >
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
                ),
            )}

            {selected && <CandidatePanel candidate={selected} onClose={() => setOpenId(null)} />}
        </>
    );
}
