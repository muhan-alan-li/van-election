import { OFFICES } from "../data/election.js";
import { candidateHref, matchHref, methodologyHref, officeHref, type Route } from "../router.js";

export function Navigation({ route }: { route: Route }) {
    return (
        <nav class="tabs" aria-label="Offices">
            <a href="#/" aria-current={route.view === "home" ? "page" : undefined}>
                Home
            </a>
            {OFFICES.map((o) => (
                <a
                    key={o.id}
                    href={officeHref(o.id)}
                    aria-current={route.view === "office" && route.office === o.id ? "page" : undefined}
                >
                    {o.title}
                </a>
            ))}
            <a href={matchHref()} aria-current={route.view === "match" ? "page" : undefined}>
                Find candidates
            </a>
            <a href={methodologyHref()} aria-current={route.view === "methodology" ? "page" : undefined}>
                Methodology
            </a>
        </nav>
    );
}

export function BackLink({ href, children }: { href: string; children: string }) {
    return (
        <p>
            <a href={href}>← {children}</a>
        </p>
    );
}

export function CandidateLink({ id, name }: { id: string; name: string }) {
    return <a href={candidateHref(id)}>{name}</a>;
}
