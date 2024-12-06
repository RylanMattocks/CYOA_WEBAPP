import { useContext } from "react";
import MenuTile from "../Components/MenuTile";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Context/UserContext"

const Menu = () => {
    const MenuOptions = ['New Game', 'Load Game', 'Logout']
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const handleClick = (option) => {
        switch(option) {
            case 'New Game' :
                navigate('/game');
                break;
            case 'Load Game' :
                navigate('/gamesave');
                break;
            case 'Logout' :
                logout();
                break;
            default :
                break;
        }
    }
    return (
        <div>
            {MenuOptions.map((item, index) => (
                <div key={index}>
                    <MenuTile item={item} onClick={() => handleClick(item)}/>
                </div>
            ))}
        </div>
    )
}

export default Menu;