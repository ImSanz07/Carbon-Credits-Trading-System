interface Emission {
    emission: number;
    month: string;
}


interface UserData {
    emissions: Emission[]; // Assuming credits is an array of Credit objects
}


interface EmissionData {
    emissionsArray: Emission[];
}

export const fetchCarbonEmissions = async  (gstin: string): Promise<EmissionData>=>{

    try {

        const response = await fetch(`/api/msme/profile/fetchUserInfo/${gstin}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data for GSTIN: ${gstin}`);
        }

        const data: UserData = await response.json(); 
        // Type the response as UserData

        const emissionsArray: Emission[] = data.emissions || [];
        console.log(emissionsArray);


        return {
            emissionsArray,
        };
        
    } catch (error) {
        console.error("Error fetching user data:", error);

        return {
            emissionsArray:[],
        };
        
    }

}