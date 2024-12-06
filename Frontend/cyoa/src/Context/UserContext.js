import { createContext, useState } from "react";
import { getStorageItem, setStorageItem } from "../Storage/LocalStorage";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(getStorageItem('currentUser'));
    const navigate = useNavigate();

    const login = (user) => {
        setCurrentUser(user);
        setStorageItem('currentUser', user);
    };
    
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('cyoagame_currentUser');
        navigate('/');
    };

    const removeSave = (saveName) => {
        const updatedSaves = currentUser.saves.filter(save => save.saveName !== saveName);
        setCurrentUser(prevUser => ({...prevUser, saves: updatedSaves}));
    }

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, login, logout, removeSave }}>
            { children }
        </UserContext.Provider>
    )
}