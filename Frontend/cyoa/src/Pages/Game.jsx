import { useContext, useEffect, useState } from "react"
import { getNode } from "../Functions/Game";
import ChoiceTile from "../Components/ChoiceTile";
import Header from "../Components/Header";
import { GameContext } from "../Context/GameContext";
import '../Styles/Game.css';

const Game = () => {
    const [ locationInfo, setLocationInfo ] = useState(null);
    const { currentLocation, updateLocation } = useContext(GameContext);

    useEffect(() => {
        const fetchNode = async () => {
            setLocationInfo(await getNode(currentLocation));
        };
        fetchNode();
    }, [currentLocation])

    const handleClick = async (newLocation) => {
        updateLocation(newLocation);
    }

    return (
        <div>
            <Header />
            <div className="game-container">
                <h3>{locationInfo?.text}</h3>
                <div className="choices-container">
                    {locationInfo?.options?.map((option, index) => (
                        <div key={index} className="choice-tile-container">
                            <ChoiceTile option={option} handleClick={handleClick}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Game;