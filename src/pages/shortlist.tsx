import { useState } from "preact/hooks";
import { candidateById } from "../data/index.js";
import { OFFICES } from "../data/election.js";
import type { Candidate, OfficeId } from "../data/types.js";
import { CandidatePanel } from "../components/candidate-panel.tsx";
import { OfficeTabs } from "../components/office-tabs.tsx";
import { ShortlistButton } from "../components/shortlist-button.tsx";
import { clearShortlist, useShortlist } from "../shortlist.js";

export function ShortlistPage() {
    const shortlisted = useShortlist();
    const [openId, setOpenId] = useState<string | null>(null);
    const [officeTab, setOfficeTab] = useState<OfficeId>("mayor");
    const selected = openId ? (candidateById.get(openId) ?? null) : null;

    const sections = OFFICES.map((office) => ({
        office,
        candidates: shortlisted
            .map((id) => candidateById.get(id))
            .filter((c): c is Candidate => c !== undefined && c.office === office.id)
            .sort((a, b) => a.ballot - b.ballot),
    })).filter((s) => s.candidates.length > 0);
    const active =
        sections.some((s) => s.office.id === officeTab) && sections.length > 0
            ? officeTab
            : sections[0]?.office.id;

    return (
        <>
            <h1>Shortlist</h1>
            {shortlisted.length === 0 ? (
                <p class="empty">
                    Nothing saved yet. Star names under Find candidates and they will appear here.
                </p>
            ) : (
                <>
                    <p class="lede">{shortlisted.length} saved on this device. Select a name for details.</p>
                    <p>
                        <button type="button" class="match-clear" onClick={clearShortlist}>
                            Clear the whole shortlist
                        </button>
                    </p>
                    {active && (
                        <OfficeTabs
                            tabs={sections.map(({ office, candidates }) => ({
                                id: office.id,
                                title: office.title,
                                count: candidates.length,
                            }))}
                            active={active}
                            onChange={setOfficeTab}
                        />
                    )}
                    {sections.map(({ office, candidates }) =>
                        office.id !== active ? null : (
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
                                        {office.voteFor} · {candidates.length} saved
                                    </span>
                                </h3>
                                <ul class="match-list">
                                    {candidates.map((c) => (
                                        <li class="match-row" key={c.id}>
                                            <div class="match-row-head">
                                                <button
                                                    type="button"
                                                    class="match-row-open"
                                                    aria-haspopup="dialog"
                                                    onClick={() => setOpenId(c.id)}
                                                >
                                                    <span class="match-row-name">{c.name}</span>
                                                    <span class="match-row-meta">
                                                        Ballot #{c.ballot} · {c.party}
                                                    </span>
                                                </button>
                                                <ShortlistButton id={c.id} name={c.name} />
                                            </div>
                                        </li>
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
