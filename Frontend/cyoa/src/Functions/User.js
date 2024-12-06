const url = 'http://localhost:5140/api/User/';

export const userLogin = async( username ) => {
    try {
        const response = await fetch(`${url}${username}`);
        const data = await response.json();
        return data || null;
    } catch {
        console.error("Error fetching user");
        return null;
    }
};

export const userRegister = async( username ) => {
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        const data = await response.json();
        return data || null;
    } catch {
        console.error("Error registering user")
        return null;
    }
}