import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { NavLink, useNavigate } from "react-router-dom";
import { userRegister } from "../Functions/User";

const Register = () => {
    const { login } = useContext(UserContext);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        username: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await userRegister(
                formData.username
            );
            if (user) {
                login(user);
                navigate('/game');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <h2>Register for CYOA Game</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    {error && <div>{error}</div>}
                    <button type="submit">Register</button>
                </form>
                <div>
                    Already have an account? <NavLink to="/login">Login here</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Register;