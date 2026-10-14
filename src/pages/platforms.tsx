import { SourceLink } from "../components/ui.tsx";
import { SLATES } from "../data/election.js";

export function PlatformsPage() {
    return (
        <>
            <h1>Party platforms</h1>
            <p class="lede">The shared commitments that slate candidates run on.</p>
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
        </>
    );
}
