import { useContext, useState } from "react";
import SaveTile from "./SaveTile";
import { UserContext } from "../Context/UserContext";
import '../Styles/Popup.css';

const Popup = ({ isOpen, type, onClose, onConfirm}) => {
    const { currentUser } = useContext(UserContext);
    const saves = currentUser.saves;
    const [ newSave, setNewSave ] = useState('');

    if (!isOpen) return null;

    return (
        <div className="header-popup-overlay">
            <div className="header-popup-content">
                {type === "exit" && (
                    <div>
                        <p>Are you sure you want to exit the game?</p>
                        <button onClick={() => onConfirm('exit')}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )}

                {type === "logout" && (
                    <div>
                        <p>Are you sure you want to logout?</p>
                        <button onClick={() => onConfirm('logout')}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )}

                {type === "save" && (
                    <div>
                        <p>Save your progress:</p>
                        <input type="text" placeholder="Enter save name" value={newSave} onChange={(e) => setNewSave(e.target.value)}/>
                        <button onClick={() => onConfirm('save', newSave.trim())} disabled={!newSave.trim()}>Save</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                )}

                {type === "load" && (
                    <div>
                        <p>Select a save to load:</p>
                        <ul>
                            {saves?.map((save, index) => (
                                <SaveTile save={save} handleClick={() => onConfirm('load', save)} key={index} />
                            ))}
                        </ul>
                        <button onClick={onClose}>Close</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Popup;