import { BASE_URL } from "./profile_api";

export let QuoteList: () => string[] = (): string[] => {
    let returnedList: string[] = [];
    let firstTwoQuotes: string[] = ["Discipline equals freedom!",
        "Doubt, hesitation, foolishness? Those suckers all equal ZERO."];
    let thirdQuote: string = firstTwoQuotes[0] + " However: " + firstTwoQuotes[1];
    let restOfTheList: string[] = [
        "Consistency is key!",
        "Did you know? Walking just 30 minutes a day can boost your immune system.",
        "BUST 'EM!",
        "Get after it!",
        "No worker's too small!",
        "No work's too hard!",
        "No challenge is too big!",
    ];

    returnedList.push(firstTwoQuotes[0], firstTwoQuotes[1], thirdQuote);
    returnedList = [...returnedList, ...restOfTheList];

    return returnedList;
};

export const GenQuote = async (): Promise<string> => {
    try {
        const response = await fetch(`${BASE_URL}/gen-quote`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch quote: ${response.statusText}`);
        }

        const data: any = await response.json() as Object;
        return data.quote as string;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
};