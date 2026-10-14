import { CANDIDATES } from "../data/index.js";
import { ELECTION, SLATES } from "../data/election.js";
import { matchHref, shortlistHref } from "../router.js";
import { Badge, SourceLink } from "../components/ui.tsx";

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
                <a class="card" href={shortlistHref()}>
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
            <h2>How this guide works</h2>
            <p>
                Names, ballot numbers and ballot order come from the City of Vancouver's declaration of
                election by voting. We read platforms in campaign and slate publications and link each promise
                to the page we read it on. A <Badge tone="aligned">Reviewed</Badge> profile means we read the
                platform against its sources; a <Badge tone="noev">Not reviewed</Badge> profile means the
                candidate is on the ballot but we have not read a platform yet. That is unknown, not negative.
            </p>
            <p>
                Arguments for and against are what people in this campaign say — not our view. We do not
                endorse, rank or recommend anyone. The finder asks about issues where candidates have stated a
                position: for mayor we read the candidate's own platform, everywhere else the position belongs
                to their slate. Starred names are saved on your device under Shortlist and never leave your
                browser.
            </p>
            <p>
                Election information changes fast in the final week. If something is wrong, check{" "}
                <SourceLink href={ELECTION.planYourVoteUrl}>Plan Your Vote</SourceLink> and the linked
                campaign source, then send us the URL.
            </p>
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
