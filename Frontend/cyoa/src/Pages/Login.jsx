import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { NavLink, useNavigate } from "react-router-dom";
import { userLogin } from "../Functions/User";
import '../Styles/Login.css';

const Login = () => {
    const { login } = useContext(UserContext);
    const [ username, setUsername ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await userLogin(username);
            if (!user) {
                setError('Error fetching user data.');
                throw new Error(error)
            }

            login(user);
            navigate('/game');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Welcome To Surviving the Silent City!</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Login</button>
            </form>
            <div className="login-footer">
                Don't have an account? <NavLink to="/register">Register</NavLink>
            </div>
        </div>
    )
}

export default Login;