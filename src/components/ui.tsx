import type { ComponentChildren } from "preact";

export function SourceLink({ href, children }: { href: string; children: ComponentChildren }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children} <span aria-hidden="true">↗</span>
            <span class="sr-only">(opens in a new tab)</span>
        </a>
    );
}

export function Badge({ tone, children }: { tone: string; children: ComponentChildren }) {
    return <span class={`chip s-${tone}`}>{children}</span>;
}
