import { toggleShortlist, useShortlist } from "../shortlist.js";

/** Star toggle that saves a candidate to the shortlist on this device. */
export function ShortlistButton({ id, name }: { id: string; name: string }) {
    const shortlist = useShortlist();
    const saved = shortlist.includes(id);
    return (
        <button
            type="button"
            class={`shortlist-btn${saved ? " is-saved" : ""}`}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${name} from your shortlist` : `Add ${name} to your shortlist`}
            title={saved ? "Remove from shortlist" : "Add to shortlist"}
            onClick={() => toggleShortlist(id)}
        >
            <span aria-hidden="true">{saved ? "★" : "☆"}</span>
        </button>
    );
}
