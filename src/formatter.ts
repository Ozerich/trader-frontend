export const formatNumber = (value: number | undefined): string => {
    if (value === undefined) {
        return '-'
    }

    if (value < 1000) {
        return String(value);
    }

    if (value < 1000 * 1000) {
        return Math.round(value / 1000) + ' k.';
    }

    const mln = value / 1000 / 1000;
    if (mln > 1000) {
        return (mln / 1000).toFixed(2) + ' bln';
    }

    return Math.round(mln) + ' mln.';
}

export const formatPrice = (value: number | undefined): string => {
    if (!value) {
        return '-';
    }

    return value.toFixed(2);
}

export function isDifferenceLarge(a: number, b: number, maxDiff: number) {
    const diff = Math.abs(a - b);
    const avg = (a + b) / 2;
    const percentDiff = (diff / avg) * 100;

    return percentDiff > maxDiff;
}