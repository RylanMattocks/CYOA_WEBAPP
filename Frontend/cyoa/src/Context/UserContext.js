import { createContext, useState } from "react";
import { getStorageItem, isExpired, setStorageItem } from "../Storage/LocalStorage";
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

    // const checkToken = () => {
    //     const path = window.location.pathname;
    //     if (!getStorageItem('currentUser') || isExpired('currentUser')) {
    //         if (path !== '/login' && path !== '/register') logout();
    //     }
    // };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            { children }
        </UserContext.Provider>
    )
}