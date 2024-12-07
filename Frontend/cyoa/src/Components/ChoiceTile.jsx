import '../Styles/ChoiceTile.css';

const ChoiceTile = ({ option, handleClick }) => {

    return(
        <div className='choice-tile-container'>
            <h3 onClick={() => handleClick(option)}>{option.text}</h3>
        </div>
    )
}

export default ChoiceTile;