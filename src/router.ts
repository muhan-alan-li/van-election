import type { OfficeId } from "./data/types.js";

export type Route =
    | { view: "home" }
    | { view: "office"; office: OfficeId }
    | { view: "candidate"; id: string }
    | { view: "match" }
    | { view: "methodology" };

export const officeHref = (office: OfficeId): string => `#/office/${office}`;
export const candidateHref = (id: string): string => `#/c/${encodeURIComponent(id)}`;
export const methodologyHref = (): string => "#/methodology";
export const matchHref = (): string => "#/match";

const OFFICES: OfficeId[] = ["mayor", "council", "park", "school"];

export function parseHash(hash: string = window.location.hash): Route {
    const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    try {
        if (parts[0] === "office" && parts[1] && OFFICES.includes(parts[1] as OfficeId))
            return { view: "office", office: parts[1] as OfficeId };
        if (parts[0] === "c" && parts[1]) return { view: "candidate", id: decodeURIComponent(parts[1]) };
        if (parts[0] === "match") return { view: "match" };
        if (parts[0] === "methodology") return { view: "methodology" };
    } catch {
        /* malformed URL falls through to home */
    }
    return { view: "home" };
}
