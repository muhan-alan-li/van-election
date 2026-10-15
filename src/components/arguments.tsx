/** The two sides of an issue. Both keep the same visual weight. */
export function Arguments({ forArgs, against }: { forArgs: string[]; against: string[] }) {
    if (forArgs.length === 0 && against.length === 0)
        return <p class="count">Trade-offs not yet reviewed in the sources checked.</p>;
    return (
        <div class="arg-cols">
            {forArgs.length > 0 && (
                <div class="arg-col arg-for">
                    <h4>Arguments for</h4>
                    <ul>
                        {forArgs.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </div>
            )}
            {against.length > 0 && (
                <div class="arg-col arg-against">
                    <h4>Arguments against</h4>
                    <ul>
                        {against.map((a, i) => (
                            <li key={i}>{a}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
