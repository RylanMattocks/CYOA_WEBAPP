import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { NavLink, useNavigate } from "react-router-dom";
import { userRegister } from "../Functions/User";
import '../Styles/Register.css';

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
        <div className="register-container">
            <h2 className="register-heading">Register for CYOA Game</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
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
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Register</button>
            </form>
            <div className="register-footer">
                Already have an account? <NavLink to="/login">Login here</NavLink>
            </div>
        </div>
    )
}

export default Register;