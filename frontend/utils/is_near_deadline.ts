/**
 * Checks if the current date is 3 days away or less than the given deadline.
 * @param deadline - The deadline date to compare with.
 * @returns true if the current date is 3 days away or less from the deadline; otherwise, false.
 */
export default function isNearDeadline(deadline: Date): boolean {
    const now = new Date(); // Get the current date and time
    const deadlineDate = new Date(deadline); // Ensure deadline is a Date object

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = deadlineDate.getTime() - now.getTime();

    // Convert milliseconds to days
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    // Check if the difference is between 1 and 3 days (exclusive of 0 or negative days)
    return differenceInDays > 0 && differenceInDays <= 3;
}