import './detailsTrip.css';
import { Link } from "react-router-dom";
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const DetailsTrip = () => {
    let { id } = useParams();
    let history = useHistory();
    
    const [tripAbout, setTripAbout] = useState('');
    useEffect(() => {
        Axios.get(`http://localhost:3001/byId/${id}`).then((response) => {
            setTripAbout(response.data.about);
        })
    });

    const onDelete = () => {
        Axios.delete(`http://localhost:3001/delete/${id}`);
    }

    return (
        <div className="trip-details">

            <div className="trip-details__header">
            <h1 className="trip-details__heading">Trip Details</h1>
            </div>

            <div className="trip-details__body">
              <div className="trip-details__creator-description">
                 <h3>Name: <span>Ivan</span></h3>
                 <h3>Age: <span>21</span></h3>
                 <h3>Number: <span>089412424</span></h3>
              </div>

              <div className="trip-details__trip-description">
                <h3>Description</h3>
                <p>{tripAbout}</p>
              </div>
            </div>

            <div className="trip-details__footer">
              <div className="buttons-wrapper">
              <button className="edit-trip-btn">Edit</button>
              <button className="delete-trip-btn">Delete</button>
              </div>
            </div>
            
        </div>
    )
}

export default DetailsTrip;
