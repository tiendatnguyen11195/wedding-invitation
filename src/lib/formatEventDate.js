/**
 * Formats a date string into Indonesian format
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @returns {string} The formatted date string in Indonesian
 * 
 * @example
 * // returns "Senin, 1 Januari 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 * 
 * // returns "1 Januari 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 * 
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = 'full') => {
    const date = new Date(isoString);

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Europe/Helsinki'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Europe/Helsinki'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Europe/Helsinki'
        }
    };

    let formatted = date.toLocaleDateString('en-US', formats[format]);

    // Handle time format separately
    if (format === 'time') {
        return date.toLocaleTimeString('en-US', formats[format]);
    }

    // Format adjustment for full date
    if (format === 'full') {
        const parts = formatted.split(', ');
        if (parts.length === 2) {
            formatted = `${parts[0]}, ${parts[1]}`;
        }
    }

    return formatted;
};