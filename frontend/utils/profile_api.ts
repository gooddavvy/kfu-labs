export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const getProfileInfo = async (username: string = "johndoe"): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/get-profile?username=${encodeURIComponent(username)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch profile info: ${response.statusText}`);
        }

        const data: any = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile info:', error);
        throw error;
    }
};

export const updateProfileInfo = async (newProfileInfo: any): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/update-profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProfileInfo),
        });

        if (!response.ok) {
            return new Error(`Failed to update profile info: ${response.statusText}`);
        }
    } catch (error: any) {
        console.error('Error updating profile info:', error);
        return error;
    }

    return null as unknown as Error;
};
