import Axios from 'axios';
import './addTrip.css';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AddTrip = () => {
    let history = useHistory();

    const token = sessionStorage.getItem('accessToken');
    const userId = jwt_decode(token).id;

    const onAddTrip = (e) => {
        e.preventDefault();
        const fromCity = e.target.fromCity.value;
        const toCity = e.target.toCity.value;
        const openSeats = e.target.openSeats.value;
        const about = e.target.description.value;

        Axios.post('http://localhost:3001/insert', {
            fromCity: fromCity,
            toCity: toCity,
            openSeats: openSeats,
            about: about,
            creator: userId
        })
        history.push('/');
    }

    return (
        <div className="add-trip">
            <div className="add-trip__header">
                <h1 className="add-trip__heading">Trip Info</h1>
            </div>

            <form className="add-trip__form" onSubmit={onAddTrip}>
                <label htmlFor="fromCity">From City</label>
                <input className="addtrip-input-field" type="text" id="fromCity" name="fromCity" placeholder="Burgas..." />

                <label htmlFor="toCity">To City</label>
                <input className="addtrip-input-field" type="text" id="toCity" name="toCity" placeholder="Varna..." />

                <label htmlFor="openSeats">Open seats</label>
                <input className="addtrip-input-field" type="number" id="openSeats" name="openSeats" placeholder="2..." />

                <label htmlFor="description">Details</label>
                <input className="addtrip-input-field" type="text" id="description" name="description" placeholder="Description..." />

                <button type="submit" className="main-btn" >Add</button>
            </form>
        </div>
    )
}

export default AddTrip;
