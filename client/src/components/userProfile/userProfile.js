import './userProfile.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const token = sessionStorage.getItem('accessToken');
  const userId = jwt_decode(token).id;

    useEffect(() => {
      Axios
      .get(`http://localhost:3001/user-profile/${userId}`)
      .then((response) => {
          setUser(response.data);
      });
    },[]);
    
    
  return (
    <div className="user-profile">

      <div className="user-profile__header">
        <h1 className="user-profile__heading">User Info</h1>

      </div>

      <div className="user-profile__body">
        <div className="user-profile__description">
          <h4 className="user-profile__name">Name: {user.name}</h4>
          <h4 className="user-profile__age">Age: {user.age}</h4>
          <h4 className="user-profile__phone-number">Number: {user.phoneNumber}</h4>
        </div>

        <div className="buttons-wrapper">
          <button className="edit-profile-btn">Edit</button>
          <button className="delete-profile-btn">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
