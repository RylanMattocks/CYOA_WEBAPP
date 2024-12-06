import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { NavLink, useNavigate } from "react-router-dom";
import { userLogin } from "../Functions/User";

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
        <div>
            <div>
                <h2>Welcome To CYOA Game!</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Username"
                            required
                        />
                    </div>
                    {error && <div>{error}</div>}
                    <button type="submit">Login</button>
                </form>
                <div>
                    Don't have an account? <NavLink to="/register">Register</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login;