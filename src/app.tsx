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
        window.scrollTo(0, 0);
    }, [route]);
    return (
        <>
            <header class="top">
                <div class="topwrap">
                    <div class="brand">Vancouver Election ’26</div>
                    <Navigation route={route} />
                </div>
            </header>
            <main id="app" class="shell">
                {route.view === "candidate" ? (
                    <CandidatePage key={route.id} id={route.id} />
                ) : route.view === "match" ? (
                    <MatchPage />
                ) : route.view === "platforms" ? (
                    <PlatformsPage />
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
                        are what people in this campaign say. Coverage is partial, so check the linked sources
                        before you vote.
                    </p>
                </div>
            </footer>
        </>
    );
}
