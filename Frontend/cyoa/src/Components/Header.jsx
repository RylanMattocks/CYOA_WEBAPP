import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import { saveGame, updateUser } from "../Functions/User";
import { GameContext } from "../Context/GameContext";
import '../Styles/Header.css';

const Header = () => {
    const { currentUser, setCurrentUser, logout } = useContext(UserContext);
    const { currentLocation, updateLocation } = useContext(GameContext);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ popupOpen, setPopupOpen ] = useState(false);
    const [ popupType, setPopupType ] = useState(null);
    const EscapeOptions = ['Save Game', 'Load Game', 'Exit Game', 'Logout'];
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setMenuOpen(!menuOpen);
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [menuOpen])

    const handleMenuClick = (option) => {
        if (option === 'Exit Game') {
            setPopupType('exit');
        }
        else if (option === 'Save Game') {
            setPopupType('save');
        }
        else if (option === 'Load Game') {
            setPopupType('load');
        }
        else if (option === 'Logout') {
            setPopupType('logout');
        }
        setPopupOpen(true);
    }

    const handleConfirm = (type, data) => {
        if (type === 'exit') {
            updateLocation(null);
            navigate('/menu');
        }
        else if (type === 'logout') {
            logout();
        }
        else if (type === 'save') {
            saveGame(data, currentLocation, currentUser.username);
            updateUser(currentUser.username, currentUser.diceRoll, currentUser.bagCheck, currentUser.looping);
            const newSave = {saveName: data, saveLocation: currentLocation}
            const updatedSaves = [...currentUser.saves, newSave];
            setCurrentUser(prevUser => ({...prevUser, saves: updatedSaves}));
        }
        else if (type === 'load') {
            updateLocation(data.saveLocation);
            navigate('/game');
        }

        setPopupOpen(false);
    }

    const handleClose = () => {
        setPopupOpen(false);
    }

    return (
        <div>
            {menuOpen && <div className="overlay active" onClick={toggleMenu}></div>}

            <div className="header">
                <div className="header-game-name">
                    <h1>Surviving the Silent City</h1>
                </div>
                <div className="header-hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`header-menu ${menuOpen ? 'open' : ''}`}>
                    {EscapeOptions.map((option, index) => (
                        <li key={index} onClick={() => handleMenuClick(option)}>{option}</li>
                    ))}
                </ul>
                <Popup
                    isOpen={popupOpen}
                    type={popupType}
                    onClose={handleClose}
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    )
}

export default Header;