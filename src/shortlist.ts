import { useEffect, useState } from "preact/hooks";

const KEY = "van26-shortlist";

function load(): Set<string> {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return new Set();
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return new Set();
        return new Set(parsed.filter((x): x is string => typeof x === "string"));
    } catch {
        return new Set();
    }
}

let ids = load();
let snapshot: string[] = [...ids];
const listeners = new Set<() => void>();

function subscribe(fn: () => void): () => void {
    listeners.add(fn);
    return () => {
        listeners.delete(fn);
    };
}

function commit() {
    snapshot = [...ids];
    try {
        localStorage.setItem(KEY, JSON.stringify(snapshot));
    } catch {
        /* private mode: keep the in-memory list */
    }
    for (const fn of listeners) fn();
}

function getSnapshot(): string[] {
    return snapshot;
}

export function toggleShortlist(id: string) {
    const next = new Set(ids);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    ids = next;
    commit();
}

export function clearShortlist() {
    if (ids.size === 0) return;
    ids = new Set();
    commit();
}

/** Live list of shortlisted candidate ids, persisted to localStorage. */
export function useShortlist(): string[] {
    const [list, setList] = useState<string[]>(getSnapshot);
    useEffect(() => subscribe(() => setList(getSnapshot())), []);
    return list;
}
