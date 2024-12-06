import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { getNode } from "../Functions/Game";
import ChoiceTile from "../Components/ChoiceTile";

const Game = ({ startLocation }) => {
    const [ location, setLocation ] = useState(null);
    const initialLocation = startLocation || 'start';

    useEffect(() => {
        const fetchNode = async () => {
            setLocation(await getNode(initialLocation));
        };
        fetchNode();
    }, [initialLocation])

    const handleClick = async (location) => {
        setLocation(await getNode(location));
    }

    return (
        <div>
            <div>
                <h3>{location?.text}</h3>
                {location?.options.map((option, index) => (
                    <div key={index}>
                        <ChoiceTile option={option} onClick={() => handleClick(option.next)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Game;