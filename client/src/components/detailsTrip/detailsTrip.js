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
        <section className="expense-report">
            <h1>USERNAME</h1>

            <div className="report-description">
                <p>{tripAbout}</p>
            </div>

            <div className="report-action" onClick={() => { history.push(`/edit/${id}`) }}>
                <Link to="/delete/:id" onClick={onDelete}>Delete</Link>
                <Link to="/edit/:id">Edit</Link>
            </div>
        </section>
    )
}

export default DetailsTrip;
