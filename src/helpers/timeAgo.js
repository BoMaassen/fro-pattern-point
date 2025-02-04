function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: "jaar", plural: "jaren", seconds: 31536000 },
        { label: "maand", plural: "maanden", seconds: 2592000 },
        { label: "week", plural: "weken", seconds: 604800 },
        { label: "dag", plural: "dagen", seconds: 86400 },
        { label: "uur", plural: "uren", seconds: 3600 },
        { label: "minuut", plural: "minuten", seconds: 60 },
        { label: "seconde", plural: "seconden", seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            const label = count === 1 ? interval.label : interval.plural;
            return `${count} ${label} geleden`;
        }
    }

    return "zojuist";
}

export default timeAgo;