import './header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <ul className="header-left-ul">
                <li>
                    <Link to="/" className="left-floated">Home</Link>
                </li>
            </ul>
            <ul className="header-right-ul">
                <li>
                    <Link to="/login" className="header-login-btn">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;
