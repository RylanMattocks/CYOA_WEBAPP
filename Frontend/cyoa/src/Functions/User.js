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

export const saveGame = async ( saveName, saveLocation, username) => {
    try {
        const response = await fetch(`${url}save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ saveName, saveLocation, username })
        });
        if (!response.ok) throw new Error();
        return "created";
    } catch {
        console.log("error");
        return null;
    }
}

export const deleteSave = async (saveName) => {
    try {
        const response = await fetch(`${url}${saveName}?type=save`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error();
        return "deleted"; 
    } catch {
        console.log('error');
        return null;
    }
}