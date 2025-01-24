export async function getFirebasePublicKeys() {
    try {
        const jwksResponse = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
        return await jwksResponse.json()
    } catch (error) {
        console.error('Failed to fetch Firebase public keys:', error);
        return null;
    }
}