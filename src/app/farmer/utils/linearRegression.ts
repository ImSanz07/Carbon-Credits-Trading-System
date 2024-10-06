interface Credit {
    creditsEarned: number; // Adjust the property name based on your actual data structure
}

interface CarbonData {
    carbonCreditsHistory: Credit[]; // Assuming credits is an array of Credit objects
}

export const predictNextMonthCredits = (creditsArray: Credit[]): number => {
    const n = creditsArray.length;

    if (n === 0) return 0;

    // Calculate average month index
    const sumX = creditsArray.reduce((acc, _, index) => acc + index, 0);
    const sumY = creditsArray.reduce((acc, { creditsEarned }) => acc + creditsEarned, 0);
    const sumXY = creditsArray.reduce((acc, { creditsEarned }, index) => acc + (index * creditsEarned), 0);
    const sumX2 = creditsArray.reduce((acc, _, index) => acc + (index ** 2), 0);

    // Calculate slope (m) and intercept (b)
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;

    // Predict next month (n)
    const nextMonthPrediction = slope * n + intercept;
    return Math.max(0, nextMonthPrediction); // Ensure it's not negative
};
