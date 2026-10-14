export type Route =
    | { view: "home" }
    | { view: "candidate"; id: string }
    | { view: "match" }
    | { view: "platforms"; id?: string }
    | { view: "shortlist" };

export const candidateHref = (id: string): string => `#/c/${encodeURIComponent(id)}`;
export const matchHref = (): string => "#/match";
export const platformsHref = (): string => "#/platforms";
export const platformHref = (id: string): string => `#/platforms/${encodeURIComponent(id)}`;
export const shortlistHref = (): string => "#/shortlist";

export function parseHash(hash: string = window.location.hash): Route {
    const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    try {
        if (parts[0] === "c" && parts[1]) return { view: "candidate", id: decodeURIComponent(parts[1]) };
        if (parts[0] === "match") return { view: "match" };
        if (parts[0] === "platforms")
            return { view: "platforms", id: parts[1] ? decodeURIComponent(parts[1]) : undefined };
        if (parts[0] === "shortlist") return { view: "shortlist" };
    } catch {
        /* malformed URL falls through to home */
    }
    return { view: "home" };
}
