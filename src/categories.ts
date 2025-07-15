export const CATEGORIES = [
    {id: 'fda_patents', label: 'FDA / Patents'},
    {id: 'crypto', label: 'Crypto'},
    {id: 'other', index: 1, label: 'Other'},
];

if (window.innerWidth > 2000) {
    CATEGORIES.push({
        id: 'other',
        index: 2,
        label: 'Other 2'
    });
}

if (window.innerWidth > 2500) {
    CATEGORIES.push({
        id: 'other',
        index: 3,
        label: 'Other 3'
    });
}