import { useContext } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Menu from '../Pages/Menu';
import Game from '../Pages/Game';
import { GameContext } from '../Context/GameContext';

const AppRoutes = () => {
    const { currentUser } = useContext(UserContext);
    const { currentLocation } = useContext(GameContext);
    return (
        <Routes>
            <Route path='/' element={!currentUser ? <Navigate to='/login' /> : <Navigate to='/menu' />} />
            <Route path='/login' element={!currentUser ? <Login /> : <Navigate to='/menu' />} />
            <Route path='/register' element={!currentUser ? <Register /> : <Navigate to='/menu' />} />
            <Route path='/game' element={!currentUser ? <Navigate to='/login' /> : !currentLocation ? <Navigate to='/menu' /> : <Game />} />
            <Route path='/menu' element={!currentUser ? <Navigate to='/login' /> : <Menu />} />
        </Routes>
    )
}

export default AppRoutes;