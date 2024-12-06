import { createContext, useState } from "react";
import { getStorageItem, setStorageItem } from "../Storage/LocalStorage";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [ currentLocation, setCurrentLocation ] = useState(getStorageItem('currentLocation'));

    const updateLocation = (newLocation) => {
        setCurrentLocation(newLocation);
        setStorageItem('currentLocation', newLocation);
    };

    return (
        <GameContext.Provider
            value={{
                currentLocation, 
                updateLocation
            }}
        >
            {children}
        </GameContext.Provider>
    )
}