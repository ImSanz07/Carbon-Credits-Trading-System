import axios from "axios";

interface CarbonCreditsHistory {
    month: string;
    creditsEarned: number;
}

interface Farmer {
    aadharNumber: string;
    carbonCreditsHistory: CarbonCreditsHistory[];
}

const BuyingLogic = async (credits: number, district: string) => {
    console.log(`${credits} credits Kharid Liya BC.`);

    try {
        const response = await axios.get<Farmer[]>(`/api/msme/marketplace/getCarbonCreditHistory/${district}`);
        const farmers = response.data;

        // Calculate total available credits in the district
        const totalAvailableCredits = farmers.reduce((total, farmer) => {
            const lastEntry = farmer.carbonCreditsHistory[farmer.carbonCreditsHistory.length - 1]; // Get last entry
            return total + (lastEntry ? lastEntry.creditsEarned : 0); // Add last entry's creditsEarned
        }, 0);

        console.log("Total available credits in the district:", totalAvailableCredits);

        // Check if requested credits exceed total available credits
        if (credits > totalAvailableCredits) {
            console.error("You cannot buy more credits than available.");
            // Handle error with a toaster or alert
            return;
        }

        const MAX_CAP_PERCENTAGE = 0.3;

        // Use a Map to combine allocations
        const allocationMap = new Map<string, number>();
        let remainingCredits = credits;

        // Step 4: Round-robin distribution with a cap
        let index = 0;

        while (remainingCredits > 0 && index < farmers.length) {
            const farmer = farmers[index];
            const lastEntry = farmer.carbonCreditsHistory[farmer.carbonCreditsHistory.length - 1]; // Last entry
            if (lastEntry) {
                const farmerCreditsAvailable = lastEntry.creditsEarned;

                // Calculate the maximum amount a farmer can contribute (capped at 30%)
                const maxFarmerContribution = Math.min(farmerCreditsAvailable * MAX_CAP_PERCENTAGE, farmerCreditsAvailable);

                // Determine the contribution (either what's left or the capped contribution)
                const farmerContribution = Math.min(maxFarmerContribution, remainingCredits);

                // Add this farmer's contribution to the allocation map
                allocationMap.set(farmer.aadharNumber, (allocationMap.get(farmer.aadharNumber) || 0) + farmerContribution);

                // Decrease remaining credits by this farmer's contribution
                remainingCredits -= farmerContribution;
            }

            // Move to the next farmer in a round-robin manner
            index = (index + 1) % farmers.length;
        }

        // Step 5: Handle any remaining credits by re-allocating from the least contributing farmers
        if (remainingCredits > 0) {
            // Sort farmers by the amount they have contributed so far (lowest to highest)
            const sortedAllocations = Array.from(allocationMap.entries()).sort((a, b) => a[1] - b[1]);

            // Distribute the remaining credits from those who have contributed the least
            for (let i = 0; i < sortedAllocations.length && remainingCredits > 0; i++) {
                const [aadharNumber, creditsAllocated] = sortedAllocations[i];
                const farmer = farmers.find(farmer => farmer.aadharNumber === aadharNumber);
                const lastEntry = farmer?.carbonCreditsHistory[farmer.carbonCreditsHistory.length - 1];

                if (lastEntry) {
                    const farmerCreditsAvailable = lastEntry.creditsEarned - creditsAllocated;

                    // Determine the new contribution from this farmer
                    const additionalContribution = Math.min(farmerCreditsAvailable, remainingCredits);
                    allocationMap.set(aadharNumber, creditsAllocated + additionalContribution);
                    remainingCredits -= additionalContribution;
                }
            }
        }

        // Convert the allocation map back to an array of objects
        const allocation = Array.from(allocationMap.entries()).map(([aadharNumber, creditsAllocated]) => ({
            aadharNumber,
            creditsAllocated,
        }));

        console.log("Custom Allocation with Cap and Round-Robin:", allocation);
        //Start the payment logic
        return allocation;

    } catch (error) {
        console.error("Error fetching carbon credit history:", error);
        throw error;
    }
};

export default BuyingLogic;
