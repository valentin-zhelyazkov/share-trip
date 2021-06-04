import './editUserProfile.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const EditUserProfile = () => {
    const [user, setUser] = useState({});
    const [err, setErr] = useState('');
    const token = sessionStorage.getItem('accessToken');
    const userId = jwt_decode(token).id;
    const history = useHistory();

    useEffect(() => {
        Axios
            .get(`http://localhost:3001/user-profile/${userId}`)
            .then((response) => {
                setUser(response.data);
                
            });
    }, []);

    const onSubmitUserInfo = (e) => {
        e.preventDefault();
        const newName = e.target.name.value;
        const newAge = e.target.age.value;
        const newPhoneNumber = e.target.phoneNumber.value;
        

        Axios.put(`http://localhost:3001/updateProfile`, {
            id: userId,
            name: newName,
            age: newAge,
            phoneNumber: newPhoneNumber,          
        }).then((res) => {
            if(res.data.msg){
                setErr(res.data.msg);
            } else {
                history.push('/user-profile');
            }
        });
    }

    return (
        <div className="login-page">
            <div className="login-page__header">
                <h1 className="login-page__heading">User Info</h1>
            </div>

            <form className="login-form" onSubmit={onSubmitUserInfo}>

                <label htmlFor="name">Name</label>
                <input id="name" className="login-input-field" type="text" name="name" defaultValue={user.name} />

                <label htmlFor="age">Age</label>
                <input id="age" className="login-input-field" type="text" name="age" defaultValue={user.age} />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input id="phoneNumber" className="login-input-field" type="text" name="phoneNumber" defaultValue={user.phoneNumber} />

                <p className="error-message">{err}</p>

                <button type="submit" className="main-btn">Submit</button>
            </form>
        </div>
    )
}

export default EditUserProfile;
