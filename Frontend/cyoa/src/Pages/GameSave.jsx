import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import SaveTile from "../Components/SaveTile";

const GameSave = () => {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser)
    return (
        <div>
            {currentUser.saves.map((save, index) => (
                <div key={index}>
                    <SaveTile save={save} />
                </div>
            ))}
        </div>
    )
}

export default GameSave;