
export default function parseHour(hour) {

    const heureRegex = /(\d{2}):(\d{2})/;

    const match = heureRegex.exec(hour);
    return match[0];
}

