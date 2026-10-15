import type { OfficeId } from "../data/types.js";

export interface OfficeTab {
    id: OfficeId;
    title: string;
    count: number;
}

/** One office visible at a time. Arrow keys move between tabs. */
export function OfficeTabs({
    tabs,
    active,
    onChange,
}: {
    tabs: OfficeTab[];
    active: OfficeId;
    onChange: (id: OfficeId) => void;
}) {
    const move = (dir: 1 | -1) => {
        const i = tabs.findIndex((t) => t.id === active);
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        onChange(next.id);
        document.getElementById(`office-tab-${next.id}`)?.focus();
    };
    return (
        <div
            class="office-tabs"
            role="tablist"
            aria-label="Candidates by office"
            onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                    e.preventDefault();
                    move(1);
                } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    move(-1);
                } else if (e.key === "Home") {
                    e.preventDefault();
                    onChange(tabs[0].id);
                    document.getElementById(`office-tab-${tabs[0].id}`)?.focus();
                } else if (e.key === "End") {
                    e.preventDefault();
                    onChange(tabs[tabs.length - 1].id);
                    document.getElementById(`office-tab-${tabs[tabs.length - 1].id}`)?.focus();
                }
            }}
        >
            {tabs.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`office-tab-${t.id}`}
                    aria-selected={t.id === active}
                    aria-controls={`office-panel-${t.id}`}
                    tabIndex={t.id === active ? 0 : -1}
                    class={`office-tab${t.id === active ? " is-active" : ""}`}
                    onClick={() => onChange(t.id)}
                >
                    {t.title} <span class="office-tab-count">{t.count}</span>
                </button>
            ))}
        </div>
    );
}
