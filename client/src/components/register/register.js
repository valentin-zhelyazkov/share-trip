import './register.css';
import Axios from 'axios';
import React, { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const history = useHistory();
    const [err, setErr] = useState('');
    const onReistration = (e) => {
        e.preventDefault();
        
        const username = e.target.username.value;
        const password = e.target.password.value;
        const rePassword = e.target.rePassword.value;
        const name = e.target.name.value;
        const age = e.target.age.value;
        const phoneNumber = e.target.phoneNumber.value;
        
        

        Axios.post('http://localhost:3001/register', {username , password, rePassword, name, age, phoneNumber}).then((res) =>{           
            if(res.data.msg){
                setErr(res.data.msg);
            } else {
                history.push('/login');
            }
        })
        
    };
    
    return (
        <div className="register-page">
            <div className="register-page__header">
                <h1 className="register-page__heading">Register</h1>
            </div>

            <form className="register-form" onSubmit={onReistration}>
                <div className="register-form__data">
                    <div className="register-form__data-main">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" name="username" placeholder="Username..." />

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" placeholder="******" />

                        <label htmlFor="repeat-password">Repeat Password</label>
                        <input id="repeat-password" type="password" name="rePassword" placeholder="******" />
                    </div>

                    <div className="register-form__data-secondary" >
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" placeholder="Name..." />

                        <label htmlFor="age">Age</label>
                        <input id="age" type="text" name="age" placeholder="Age..." />

                        <label htmlFor="phone-number">Phone Number</label>
                        <input id="phone-number" type="text" name="phoneNumber" placeholder="Phone Number..." />
                    </div>
                </div>
                <p className="error-message">{err}</p>
                <button type="submit" className="main-btn">Register</button>
            </form>
        </div>
    )
}

export default Register;
