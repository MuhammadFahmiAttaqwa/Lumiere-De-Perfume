interface Orderable {
    sortOrder: number;
}

export function sortByOrder<T extends Orderable>(items: readonly T[]): T[] {
    return [...items].sort((left, right) => left.sortOrder - right.sortOrder);
}
