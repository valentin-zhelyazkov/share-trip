import './detailsTrip.css';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

const DetailsTrip = () => {  
  let { id } = useParams();

  let history = useHistory();
  const token = sessionStorage.getItem('accessToken');
  const userId = jwt_decode(token).id;

  const [tripAbout, setTripAbout] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/trip-details/${id}`).then((response) => {
      setTripAbout(response.data.about);
      setUserInfo({
        name: response.data.name, 
        age: response.data.age,
        phoneNumber: response.data.phoneNumber
      });
      
      if(userId === response.data.creator) {
        setIsCreator(true);       
      } else {
        setIsCreator(false);       
      }
    })
  },[]);



  const onDelete = () => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    history.push('/');
  }

  return (
    <div className="trip-details">

      <div className="trip-details__header">
        <h1 className="trip-details__heading">Trip Details</h1>
      </div>

      <div className="trip-details__body">
        <div className="trip-details__creator-description">
          <h3>Name: <span>{userInfo.name}</span></h3>
          <h3>Age: <span>{userInfo.age}</span></h3>
          <h3>Number: <span>{userInfo.phoneNumber}</span></h3>
        </div>

        <div className="trip-details__trip-description">
          <h3>Description</h3>
          <p>{tripAbout}</p>
        </div>
      </div>

      <div className="trip-details__footer">
      { isCreator ?
        <div className="buttons-wrapper">
          <button className="edit-trip-btn" onClick={() => history.push(`/edit/${id}`)}>Edit</button>
          <button className="delete-trip-btn" onClick={onDelete}>Delete</button>
        </div> :
        null
      }
      </div>
      

    </div>
  )
}

export default DetailsTrip;
