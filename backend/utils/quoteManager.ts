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

export let GenerateQuote: () => string = (): string => {
    const quotes = QuoteList();
    const randomIndex = Math.floor(Math.random() * quotes.length);

    return quotes[randomIndex];
};