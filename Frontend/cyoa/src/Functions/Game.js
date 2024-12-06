const url = 'http://localhost:5140/api/Game/';

export const getNode = async( location ) => {
    try {
        const response = await fetch(`${url}${location}`);
        const data = await response.json();
        return data || null;
    } catch {
        console.error("Error fetching node");
        return null;
    }
};