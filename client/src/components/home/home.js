import './home.css';
import { Link } from "react-router-dom";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {  
   const [tripList, setTripList] = useState([]);
   
   useEffect(() => {
      Axios.get('http://localhost:3001').then((response) => {
         setTripList(response.data);        
      })
   }, []);

   return (
      <div className="home-page">
         <section className="actions">
            <form>
               <input type="text" name="amount" id="refill-amount" className="trip-search-input" />
               <button type="submit" className="trip-search-btn">Search</button>
            </form>
            <div className="make-trip-container">
               <Link className="border" to="/addTrip">Make new trip</Link>
            </div>
         </section>

         <hr className="separator" />

         <div className="home-page__header">
            <ul className="home-page__header-list">
               <li className="home-page__header-list-item">From City</li>
               <li className="home-page__header-list-item">To City</li>
               <li className="home-page__header-list-item">Open Seats</li>
               <li className="home-page__header-list-item">Description</li>
            </ul>
         </div>

         <div className="home-page__body">
            {tripList.map((val, key) => {
               return (
                  <div className="trip-offer" key={key}>
                     <div className="trip-offer__header">
                        <ul className="trip-offer__list">
                           <li className="trip-offer__list-item">{val.fromCity}</li>
                           <li className="trip-offer__list-item">{val.toCity}</li>
                           <li className="trip-offer__list-item">{val.openSeats}</li>
                           <li className="trip-offer__list-item">
                              <Link className="details-btn" to={`/trip-details/${val._id}`} >About</Link>
                              <Link className="reserve-btn" to="/trip-reserve/:id" >Reserve</Link>
                           </li>
                        </ul>
                     </div>
                  </div>)
            })}
         </div>
      </div>
   )
}

export default Home;
