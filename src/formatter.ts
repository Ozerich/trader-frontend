import {Config} from "./config.ts";

export const formatNumber = (value: number | null | undefined, prefix: string = ''): string => {
    if (value === undefined || value === null) {
        return '-'
    }

    if (value < 1000) {
        return (prefix ? prefix + ' ' : '') + String(value);
    }

    if (value < 1000 * 1000) {
        return (prefix ? prefix + ' ' : '') + Math.round(value / 1000) + ' k.';
    }

    const mln = value / 1000 / 1000;
    if (mln > 1000) {
        return (prefix ? prefix + ' ' : '') + (mln / 1000).toFixed(2) + ' bln';
    }

    return (prefix ? prefix + ' ' : '') + Math.round(mln) + ' mln.';
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

export function highlightKeywords(text: string): string {
    if (!text) return text;

    const regex = new RegExp(`\\b(${ Config.HighlightWords.join('|')})\\b`, 'gi');

    return text.replace(regex, '<mark>$1</mark>');
}