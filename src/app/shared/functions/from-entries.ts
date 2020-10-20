export function fromEntries(entries: [string|number|symbol, any][]): object {
    return entries.reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}
