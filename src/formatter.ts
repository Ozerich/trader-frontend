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