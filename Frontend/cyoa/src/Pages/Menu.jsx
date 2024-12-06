import MenuTile from "../Components/MenuTile";

const Menu = () => {
    const MenuOptions = ['New Game', 'Load Game', 'Logout']
    return (
        <div>
            {MenuOptions.map((item, index) => (
                <div key={index}>
                    <MenuTile item={item} />
                </div>
            ))}
        </div>
    )
}

export default Menu;