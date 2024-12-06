import { useContext, useState } from "react";
import MenuTile from "../Components/MenuTile";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Context/UserContext"
import { GameContext } from "../Context/GameContext";
import Popup from "../Components/Popup";
import '../Styles/Menu.css';

const Menu = () => {
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const MenuOptions = ['New Game', 'Load Game', 'Logout'];
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);
    const { updateLocation } = useContext(GameContext);

    const handleConfirm = (type, data) => {
        updateLocation(data.saveLocation);
        navigate('/game');
    }

    const handleClick = (option) => {
        switch(option) {
            case 'New Game' :
                updateLocation('start');
                navigate('/game');
                break;
            case 'Load Game' :
                setIsPopupOpen(true);
                break;
            case 'Logout' :
                logout();
                break;
            default :
                break;
        }
    }
    return (
        <div className="menu-container">
            <div className="menu-title">
                <h1>Name of Game Here</h1>
            </div>
            <div className="menu-options">
                {MenuOptions.map((item, index) => (
                    <div key={index} className="menu-option">
                        <MenuTile item={item} onClick={() => handleClick(item)}/>
                    </div>
                ))}
            </div>
            <Popup
                isOpen={isPopupOpen}
                type={'load'}
                onClose={() => setIsPopupOpen(false)}
                onConfirm={handleConfirm}
            />
        </div>
    )
}

export default Menu;