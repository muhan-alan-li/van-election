import type { ComponentChildren } from "preact";

export function SourceLink({ href, children }: { href: string; children: ComponentChildren }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children} <span aria-label="opens in a new tab">↗</span>
        </a>
    );
}

export function Badge({ tone, children }: { tone: string; children: ComponentChildren }) {
    return <span class={`chip s-${tone}`}>{children}</span>;
}

export function Card({
    href,
    title,
    meta,
    children,
}: {
    href: string;
    title: string;
    meta?: string;
    children?: ComponentChildren;
}) {
    return (
        <a class="card" href={href}>
            <strong>{title}</strong>
            {meta && <div class="card-meta">{meta}</div>}
            {children && <div>{children}</div>}
        </a>
    );
}
