import { useCallback, useContext, useEffect, useState } from "react"
import { getNode } from "../Functions/Game";
import ChoiceTile from "../Components/ChoiceTile";
import Header from "../Components/Header";
import { GameContext } from "../Context/GameContext";
import '../Styles/Game.css';
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Game = () => {
    const [ locationInfo, setLocationInfo ] = useState(null);
    const { currentLocation, updateLocation } = useContext(GameContext);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [ userLoop, setUserLoop ] = useState(false);
    const [ loopText, setLoopText ] = useState('');
    const [ loopOption, setLoopOption ] = useState(null);
    const locationOptions = locationInfo?.options;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNode = async () => {
            setLocationInfo(await getNode(currentLocation));
        };
        fetchNode();
    }, [currentLocation])

    useEffect(() => {
        if (locationInfo?.bagCheck) {
            setCurrentUser(prev => ({
                ...prev, bagCheck: true
            }));
        }
    }, [locationInfo?.bagCheck, setCurrentUser])

    const rollDice = useCallback(() => {
        const randInt = Math.floor(Math.random() * 20) + 1;
        setCurrentUser(prevUser => ({...prevUser, diceRoll: randInt}));
        return randInt < 13 ? '_no' : '_yes';
    }, [setCurrentUser]);

    useEffect(() => {
    
        let updatedOptions = locationOptions;
        if (locationInfo?.rollDice) {
            updatedOptions = updatedOptions?.map(option => {
                if (option.text === 'Roll the dice') {
                    option.next = option.next + rollDice();
                }
                return option;
            });
        }
    
        else if (locationInfo?.isBagChecked) {
            updatedOptions = updatedOptions.map(option => {
                if (option.text === 'Enter the door' || option.text === 'Leave the city') {
                    option.next = currentUser.bagCheck ? option.next + '_yes' : option.next + '_no';
                }
                return option
            })
        }

        if (JSON.stringify(locationInfo?.options) !== JSON.stringify(updatedOptions)) {
            setLocationInfo(prev => ({
                ...prev, options: updatedOptions
            }))
        }
    
    }, [locationInfo?.rollDice, locationInfo?.bagCheck, locationInfo?.isBagChecked, locationInfo?.options, setCurrentUser, currentUser?.bagCheck, rollDice, locationOptions])


    const handleClick = async (selectedOption) => {
        if(!selectedOption) navigate('/menu');
        updateLocation(selectedOption.next);
    };

    const formatText = (text) => {
        if (!text) return '';
        const variables = {
            user: currentUser.username,
            roll: currentUser.diceRoll
        }

        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return variables[key] || match;
        })
    }

    if (currentUser.looping >= 3 && locationInfo?.Next === "start") {
        setUserLoop(true);
        if (currentUser > 3) {
            setLoopOption({text: 'Continue', next: 'death'});
            setLoopText('You are stuck in an infinite loop. You fear there may be no way out...');
        }
        else {
            setLoopText('The city seems like a dangerous place, maybe you can survive with the items you have found');
            setLoopOption({text: 'Continue', next: 'start'});
        }
        
    };


    return (
        <div>
            <Header />
            {userLoop ?
            <div className="game-container">
                <h3>{loopText}</h3>
                <div className="choices-container">
                    <div className="choice-tile-container">
                        <ChoiceTile option={loopOption} handleClick={handleClick}/>
                    </div>
                </div>
            </div>
            : 
            <div className="game-container">
                <h3>{formatText(locationInfo?.text)}</h3>
                <div className="choices-container">
                    {locationInfo?.options?.map((option, index) => (
                        <div key={index} className="choice-tile-container">
                            <ChoiceTile option={option} handleClick={handleClick}/>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Game;