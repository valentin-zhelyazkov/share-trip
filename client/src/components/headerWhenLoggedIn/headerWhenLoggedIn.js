import '../header/header.css';
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import LoggedContext from '../../contexts/logged-context';

const HeaderWhenLoggedIn = () => {
    const { setIsLogged } = useContext(LoggedContext);
    const onLogout = () => {
        sessionStorage.removeItem('accessToken');
        setIsLogged(false);
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
                    <Link to="/" className="header-login-btn" onClick={onLogout}>Logout</Link>
                </li>
            </ul>
        </header>
    )
}

export default HeaderWhenLoggedIn;
