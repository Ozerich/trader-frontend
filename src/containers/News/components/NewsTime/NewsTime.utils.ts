function parseTime12to24(time12h: string): { hours: number; minutes: number; seconds: number } {
    const time = time12h.slice(0, 8);
    const modifier = time12h.slice(8);
    let [hours, minutes, seconds] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    return {hours, minutes, seconds};
}

function getNYTime(): Date {
    const date = new Date();
    const nyStr = date.toLocaleString('en-US', {timeZone: 'America/New_York'});
    return new Date(nyStr);
}

export function diffTimeInSeconds(inputTimeStr: string): number {
    const nyNow = getNYTime();

    const {hours, minutes, seconds} = parseTime12to24(inputTimeStr);

    const inputDate = new Date(nyNow);
    inputDate.setHours(hours, minutes, seconds, 0);

    let diffMs = nyNow.getTime() - inputDate.getTime();

    if (diffMs < 0) {
        inputDate.setDate(inputDate.getDate() - 1);
        diffMs = nyNow.getTime() - inputDate.getTime();
    }

    return Math.floor(diffMs / 1000);
}


export function diffTimeString(inputTimeStr: string): string {
    const nyNow = getNYTime();

    const {hours, minutes, seconds} = parseTime12to24(inputTimeStr);

    const inputDate = new Date(nyNow);
    inputDate.setHours(hours, minutes, seconds, 0);

    let diffMs = nyNow.getTime() - inputDate.getTime();

    if (diffMs < 0) {
        inputDate.setDate(inputDate.getDate() - 1);
        diffMs = nyNow.getTime() - inputDate.getTime();
    }

    const diffMinutes = Math.floor(diffMs / 60000);
    const diffSeconds = Math.floor((diffMs % 60000) / 1000);

    const pad = (n: number) => n.toString().padStart(2, '0');

    // Всегда выводим минуты и секунды, даже если минут больше 59
    return `${pad(diffMinutes)}:${pad(diffSeconds)}`;
}

