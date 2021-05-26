import './login.css';
import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import LoggedContext from '../../contexts/logged-context';

const Login = () => {
    const history = useHistory();
    const { setIsLogged } = useContext(LoggedContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    
    const onLogin = (e) => {
        e.preventDefault();
        
        Axios.post('http://localhost:3001/login', { username, password }).then((response) => {
            if(response.data.error) {
                setErr(response.data.error);
            } else {
                sessionStorage.setItem('accessToken', response.data);
                setIsLogged(true);
                history.push('/');
            }
        });
    };
    
    return (
            <div className="login-page">
                <div className="login-page__header">
                    <h1 className="login-page__heading">Login</h1>
                </div>

                <form className="login-form" onSubmit={onLogin}>

                    <label htmlFor="usernmae">Username</label>
                    <input id="username" className="login-input-field" type="text" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="usernmae">Password</label>
                    <input id="password" className="login-input-field" type="password" name="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
                    { err ? 
                        <p className="error-message">{err}</p>:
                        null                   
                    }

                    <button type="submit" className="main-btn">Login</button>
                </form>
            </div>
    )
}

export default Login;
