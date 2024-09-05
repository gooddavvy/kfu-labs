export default function sanitizeString(str: string, replacement: string = "_"): string {
    // Define the regex pattern for characters to be replaced or removed
    const invalidCharsPattern = /[\\/:*?"<>|/]/g;

    // Replace invalid characters with the replacement string or remove them
    return str.replace(invalidCharsPattern, replacement);
}