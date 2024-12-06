import '../Styles/MenuTile.css';

const MenuTile = ({ item, onClick }) => {
    return (
        <div>
            <button className="menu-tile-button" onClick={onClick}>{item}</button>
        </div>
    )
}

export default MenuTile;