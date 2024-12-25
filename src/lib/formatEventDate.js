export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
        short: {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }
    };

    return date.toLocaleDateString('en-US', formats[format]);
};
