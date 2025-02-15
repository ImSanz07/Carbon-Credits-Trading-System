// /farmer/home/useCarbonCredits.ts

interface Credit {
    month: string;
    creditsEarned: number; 
}

interface UserData {
    carbonCreditsHistory: Credit[]; 
}


interface ApiResponse {
    success: boolean;
    data: {
        carbonCreditsHistory: Credit[];
    };
}



interface CarbonData {
    totalRevenue: number; // Total revenue calculated
    totalCreditsIssued: number; // Total carbon credits issued
    currentCredits: number; // Current carbon credits for the latest month
    percentageChange: number;
    creditsArray: Credit[];
}


export const fetchCarbonDataCard = async (aadharNumber: string): Promise<CarbonData> => {
    try {
        const response = await fetch(`/api/farmer/profile/fetchUserInfo/${aadharNumber}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for Aadhar Number: ${aadharNumber}`);
        }

        
        
        
        
        //Used the ApiResponse interface to type the responseJson
        const responseJson: ApiResponse = await response.json();

       
        // Use creditsEarned from the carbonCreditsHistory
        const creditsArray: Credit[] = responseJson.data?.carbonCreditsHistory ?? [];
 
        // Calculate total revenue
        // const totalRevenue = creditsArray.reduce((acc, { creditsEarned }) => acc + creditsEarned * 720, 0); 
        // Assuming 1 credit = Rs 720

        // Calculate total carbon credits issued
        const totalCreditsIssued = creditsArray.reduce((acc, { creditsEarned }) => acc + creditsEarned, 0);

        // Get current carbon credits (from the latest month)
        const latestCredit = creditsArray[creditsArray.length - 1]; // Assuming the latest month is the last in the array
        const currentCredits = latestCredit ? latestCredit.creditsEarned : 0; // Get credits for the latest month or 0 if none
        const totalRevenue = currentCredits * 720;

        // Calculate percentage change
        const previousCredits = creditsArray.length > 1 ? creditsArray[creditsArray.length - 2].creditsEarned : 0; // Get credits for the previous month

        // Calculate percentage change (avoid division by zero)
        const percentageChange = previousCredits > 0
            ? ((currentCredits - previousCredits) / previousCredits) * 100: 0; // If no previous credits, set percentage change to 0

        
        

        return {
            creditsArray,
            totalRevenue,
            totalCreditsIssued,
            currentCredits,
            percentageChange
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return {
            totalRevenue: 0,
            totalCreditsIssued: 0,
            currentCredits: 0,
            percentageChange: 0,
            creditsArray:[],

        }; // Return default values on error
    }
};

