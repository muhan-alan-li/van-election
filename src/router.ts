export type Route =
    | { view: "home" }
    | { view: "candidate"; id: string }
    | { view: "match" }
    | { view: "shortlist" }
    | { view: "methodology" };

export const candidateHref = (id: string): string => `#/c/${encodeURIComponent(id)}`;
export const methodologyHref = (): string => "#/methodology";
export const matchHref = (): string => "#/match";
export const shortlistHref = (): string => "#/shortlist";

export function parseHash(hash: string = window.location.hash): Route {
    const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    try {
        if (parts[0] === "c" && parts[1]) return { view: "candidate", id: decodeURIComponent(parts[1]) };
        if (parts[0] === "match") return { view: "match" };
        if (parts[0] === "shortlist") return { view: "shortlist" };
        if (parts[0] === "methodology") return { view: "methodology" };
    } catch {
        /* malformed URL falls through to home */
    }
    return { view: "home" };
}
