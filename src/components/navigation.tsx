import { matchHref, platformsHref, shortlistHref, type Route } from "../router.js";
import { useShortlist } from "../shortlist.js";

export function Navigation({ route }: { route: Route }) {
    const shortlist = useShortlist();
    return (
        <nav class="tabs" aria-label="Sections">
            <a href="#/" aria-current={route.view === "home" ? "page" : undefined}>
                Home
            </a>
            <a href={matchHref()} aria-current={route.view === "match" ? "page" : undefined}>
                Find candidates
            </a>
            <a href={platformsHref()} aria-current={route.view === "platforms" ? "page" : undefined}>
                Party platforms
            </a>
            <a href={shortlistHref()} aria-current={route.view === "shortlist" ? "page" : undefined}>
                Shortlist{shortlist.length > 0 ? ` (${shortlist.length})` : ""}
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
