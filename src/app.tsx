import { useLayoutEffect, useState } from "preact/hooks";
import { Navigation } from "./components/navigation.tsx";
import { CandidatePage } from "./pages/candidate.tsx";
import { HomePage } from "./pages/home.tsx";
import { MatchPage } from "./pages/match.tsx";
import { PlatformsPage } from "./pages/platforms.tsx";
import { ShortlistPage } from "./pages/shortlist.tsx";
import { parseHash, type Route } from "./router.js";

export function App() {
    const [route, setRoute] = useState<Route>(() => parseHash());
    useLayoutEffect(() => {
        const onHash = () => setRoute(parseHash());
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);
    useLayoutEffect(() => {
        document.documentElement.dataset.view = route.view;
        const titles: Record<Route["view"], string> = {
            home: "Vancouver 2026 Election — Platforms and Analysis",
            match: "Find candidates — Vancouver 2026 Election",
            candidate: "Candidate profile — Vancouver 2026 Election",
            platforms: "Party platforms — Vancouver 2026 Election",
            shortlist: "Your shortlist — Vancouver 2026 Election",
        };
        document.title = titles[route.view];
        window.scrollTo(0, 0);
        document.getElementById("app")?.focus({ preventScroll: true });
    }, [route]);
    return (
        <>
            <a class="skip-link" href="#app">
                Skip to content
            </a>
            <header class="top">
                <div class="topwrap">
                    <a class="brand" href="#/">
                        Vancouver Election ’26
                    </a>
                    <Navigation route={route} />
                </div>
            </header>
            <main id="app" class="shell" tabIndex={-1}>
                {route.view === "candidate" ? (
                    <CandidatePage key={route.id} id={route.id} />
                ) : route.view === "match" ? (
                    <MatchPage />
                ) : route.view === "platforms" ? (
                    <PlatformsPage id={route.id} />
                ) : route.view === "shortlist" ? (
                    <ShortlistPage />
                ) : (
                    <HomePage />
                )}
            </main>
            <footer>
                <div class="in">
                    <p>
                        Independent voter guide for the October 17, 2026 election. Arguments for and against
                        are what people in this campaign say. Research closed October 14, 2026 and does not
                        reflect late changes. Coverage is partial, so check the linked sources before you
                        vote.
                    </p>
                </div>
            </footer>
        </>
    );
}
