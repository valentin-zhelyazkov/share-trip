import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const EditTrip = () => {
    let history = useHistory();
    const { id } = useParams();
    const [curTripInfo, setCurTripInfo] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/edit/${id}`).then((response) => {
            setCurTripInfo(response.data);
        }).catch((error) => { console.log(error) })
    }, []);

    const onSubmitInfo = (e) => {
        e.preventDefault();
        const newFromCity = e.target.fromCity.value;
        const newToCity = e.target.toCity.value;
        const newOpenSeats = e.target.openSeats.value;
        const newAbout = e.target.description.value;

        Axios.put(`http://localhost:3001/update`, {
            id: id,
            fromCity: newFromCity,
            toCity: newToCity,
            openSeats: newOpenSeats,
            about: newAbout
        });

        history.push(`/`);
    }

    return (
        <div className="add-trip">
            <div className="add-trip__header">
                <h1 className="add-trip__heading">Trip Info</h1>
            </div>

            <form className="add-trip__form" onSubmit={onSubmitInfo}>
                <label htmlFor="fromCity">From City</label>
                <input className="addtrip-input-field" type="text" id="fromCity" name="fromCity" defaultValue={curTripInfo.fromCity} />

                <label htmlFor="toCity">To City</label>
                <input className="addtrip-input-field" type="text" id="toCity" name="toCity" defaultValue={curTripInfo.toCity} />

                <label htmlFor="openSeats">Open seats</label>
                <input className="addtrip-input-field" type="number" id="openSeats" name="openSeats" defaultValue={curTripInfo.openSeats} />

                <label htmlFor="description">Details</label>
                <input className="addtrip-input-field" type="text" id="description" name="description" defaultValue={curTripInfo.about} />

                <button type="submit" className="main-btn">Submit</button>
            </form>
        </div>
    )
}

export default EditTrip;