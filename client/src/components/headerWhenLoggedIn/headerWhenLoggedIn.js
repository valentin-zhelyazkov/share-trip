import './headerWhenLoggedIn.css';
import { Link } from "react-router-dom";

const HeaderWhenLoggedIn = () => {
    const onLogout = () => {
        sessionStorage.removeItem('accessToken');
    };

    return (
        <header>
            <ul className="header-left-ul">
                <li>
                    <Link to="/" className="left-floated">Home</Link>
                </li>
            </ul>
            <ul className="header-right-ul">
                <li>
                    <Link to="/user-profile" className="header-login-btn">Profile</Link>
                </li>
                <li>
                    <button className="header-login-btn" onClick={onLogout}>Logout</button>
                </li>
            </ul>
        </header>
    )
}

export default HeaderWhenLoggedIn;
