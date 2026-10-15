import { CANDIDATES } from "../data/index.js";
import { ELECTION } from "../data/election.js";
import { matchHref, platformsHref, shortlistHref } from "../router.js";
import { Badge, SourceLink } from "../components/ui.tsx";

export function HomePage() {
    return (
        <>
            <h1>{ELECTION.title}</h1>
            <p class="lede">
                <strong>{ELECTION.votingDay}.</strong> {CANDIDATES.length} candidates running across 4 offices
                — compare what each one promises, with links to sources.
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
                <a class="card" href={platformsHref()}>
                    <strong>Party platforms</strong>
                    <div class="card-meta">
                        Browse the shared commitments that slate candidates run on, with links to sources.
                    </div>
                </a>
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
            <h2>How this guide works</h2>
            <p>
                This guide does not score or rank candidates. Arguments for and against are what people in
                this campaign say, not this guide’s view.
            </p>
            <p>{ELECTION.coverageNote}</p>
            <p>
                <Badge tone="noev">Shared party commitment</Badge> means the promise comes from the slate.
                Silence in our sources shows as “no stated position” — never as disagreement.
            </p>
        </>
    );
}
