import { useContext } from "react";
import { deleteSave } from "../Functions/User";
import { UserContext } from "../Context/UserContext";
import '../Styles/SaveTile.css';

const SaveTile = ({ save, handleClick}) => {
    const { removeSave } = useContext(UserContext);

    const handleDelete = () => {
        deleteSave(save.saveName);
        removeSave(save.saveName);
    }
    return (
        <div className="save-tile">
            <h3 onClick={() => handleClick(save.saveLocation)}>{save.saveName}</h3>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    )
}

export default SaveTile;