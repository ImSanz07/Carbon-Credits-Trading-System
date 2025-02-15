// fetchCarbonEmissions.ts
export interface Emission {
    emissions: number;
    month: string;
}

interface UserData {
    emissions: Emission[];
}

interface EmissionData {
    emissionsArray: Emission[];
    percentageChange?: number;
}

export const fetchCarbonEmissions = async (gstin: string): Promise<EmissionData> => {
    try {
        const response = await fetch(`/api/msme/profile/fetchUserInfo/${gstin}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for GSTIN: ${gstin}`);
        }
        const data: UserData = await response.json();
        const emissionsArray: Emission[] = data.emissions || [];

        // Calculate percentage change
        const percentageChange = calculatePercentageChange(emissionsArray);

        return {
            emissionsArray,
            percentageChange
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Let the component handle the error
    }
};

// Helper function to calculate percentage change
const calculatePercentageChange = (emissions: Emission[]): number => {
    if (emissions.length < 2) return 0;

    const lastMonth = emissions[emissions.length - 1].emissions;
    const previousMonth = emissions[emissions.length - 2].emissions;

    if (previousMonth === 0) return 0;
    return ((lastMonth - previousMonth) / previousMonth) * 100;
};