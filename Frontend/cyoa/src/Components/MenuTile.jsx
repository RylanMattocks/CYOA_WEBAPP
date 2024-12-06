const MenuTile = ({ item, onClick }) => {
    return (
        <div>
            <button onClick={onClick}>{item}</button>
        </div>
    )
}

export default MenuTile;