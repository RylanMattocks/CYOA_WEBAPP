const ChoiceTile = ({ option, onClick }) => {
    return(
        <div>
            <h3 onClick={() => onClick(option.next)}>{option.text}</h3>
        </div>
    )
}

export default ChoiceTile;