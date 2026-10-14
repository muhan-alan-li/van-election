import { SourceLink } from "../components/ui.tsx";
import { Arguments } from "../components/arguments.tsx";
import { BackLink } from "../components/navigation.tsx";
import { SLATES } from "../data/election.js";
import { platformHref, platformsHref } from "../router.js";

export function PlatformsPage({ id }: { id?: string }) {
    if (id) {
        const slate = SLATES.find((s) => s.id === id);
        if (!slate)
            return (
                <>
                    <BackLink href={platformsHref()}>All party platforms</BackLink>
                    <p role="alert">Party platform not found.</p>
                </>
            );
        return (
            <>
                <BackLink href={platformsHref()}>All party platforms</BackLink>
                <h1>{slate.name}</h1>
                <p class="lede">{slate.summary}</p>
                <p class="src">
                    <SourceLink href={slate.sourceUrl}>Platform source</SourceLink>
                </p>
                <h2>Shared commitments</h2>
                <p>These are the shared commitments that the party’s candidates run on.</p>
                {slate.pillars.map((pillar) => (
                    <article key={pillar.title} class="issue">
                        <h3>{pillar.title}</h3>
                        <p>{pillar.detail}</p>
                        <Arguments forArgs={pillar.for} against={pillar.against} />
                    </article>
                ))}
            </>
        );
    }
    return (
        <>
            <h1>Party platforms</h1>
            <p class="lede">
                Compare the parties’ priorities. Choose a card to explore their commitments in detail.
            </p>
            <div class="cards">
                {SLATES.map((s) => (
                    <a key={s.id} class="card slate-card" href={platformHref(s.id)}>
                        <h2>{s.name}</h2>
                        <p class="card-meta">{s.summary}</p>
                        <span class="slate-card-action">Explore platform →</span>
                    </a>
                ))}
            </div>
        </>
    );
}
