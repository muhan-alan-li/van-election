import { useState } from "preact/hooks";
import { candidateById } from "../data/index.js";
import { OFFICES } from "../data/election.js";
import { matchHref } from "../router.js";
import { CandidatePanel } from "./pages.tsx";
import { clearShortlist, removeFromShortlist, useShortlist } from "../shortlist.js";

export function ShortlistPage() {
    const shortlisted = useShortlist();
    const [openId, setOpenId] = useState<string | null>(null);
    const selected = openId ? (candidateById.get(openId) ?? null) : null;

    const sections = OFFICES.map((office) => ({
        office,
        candidates: shortlisted
            .map((id) => candidateById.get(id))
            .filter((c) => c && c.office === office.id)
            .sort((a, b) => a!.ballot - b!.ballot),
    })).filter((s) => s.candidates.length > 0);

    return (
        <>
            <p class="eyebrow">Your list</p>
            <h1>Shortlist</h1>
            {shortlisted.length === 0 ? (
                <p class="empty">
                    Nothing saved yet. Answer the questions under <a href={matchHref()}>Find candidates</a>{" "}
                    and star the names you want to keep — they will appear here, grouped by office.
                </p>
            ) : (
                <>
                    <p class="lede">
                        {shortlisted.length} candidate{shortlisted.length === 1 ? "" : "s"} saved on this
                        device. Select a name for their record and platform.
                    </p>
                    <p>
                        <button type="button" class="match-clear" onClick={clearShortlist}>
                            Clear the whole shortlist
                        </button>
                    </p>
                    {sections.map(({ office, candidates }) => (
                        <section class="match-group" key={office.id} aria-label={office.title}>
                            <h3 class="match-group-title">
                                {office.title}{" "}
                                <span class="match-count">
                                    {office.voteFor} · {candidates.length} saved
                                </span>
                            </h3>
                            <ul class="match-list">
                                {candidates.map((c) => (
                                    <li class="match-row" key={c!.id}>
                                        <div class="match-row-head">
                                            <button
                                                type="button"
                                                class="match-row-open"
                                                aria-haspopup="dialog"
                                                onClick={() => setOpenId(c!.id)}
                                            >
                                                <span class="match-row-name">{c!.name}</span>
                                                <span class="match-row-meta">
                                                    Ballot #{c!.ballot} · {c!.party}
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                class="shortlist-btn is-saved"
                                                aria-pressed="true"
                                                aria-label={`Remove ${c!.name} from your shortlist`}
                                                title="Remove from shortlist"
                                                onClick={() => removeFromShortlist(c!.id)}
                                            >
                                                <span aria-hidden="true">★</span>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </>
            )}

            {selected && <CandidatePanel candidate={selected} onClose={() => setOpenId(null)} />}
        </>
    );
}
