import React, {useEffect, useState} from 'react'
import SecureContent from "../components/secure-content";
import * as reservationService from "../services/reservation-service";
import Nav from "../components/nav";
import {useProfile} from "../context/profile-context";
import {Link} from "react-router-dom";

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const {profile} = useProfile();
    let moment = require('moment');
    const getReservations = async () => {
        const currReservations = await reservationService.findUserReservations(profile.email);
        setReservations(currReservations);
    }
    const handleDeleteReservation = async (rid) => {
        if (profile) {
            await reservationService.deleteReservation(rid).then(
                alert('Reservation Cancelled!')
            )
            window.location.reload(false)
        }
    }
    const getAllReservations = async () => {
        const currReservations = await reservationService.findUserReservations(profile.email);
        setReservations(currReservations);
    }
    const getUnpaidReservations = async () => {
        const currReservations = await reservationService.findUnpaidUserReservations(profile.email);
        setReservations(currReservations);
    }
    useEffect(()=>{
        getReservations();
    }, []);
    return (
        <div className="row">
            <div className="col-2 mt-3">
                <Nav/>
            </div>
            <div className="col-10">
                <SecureContent>
                    <div className="container mt-3 border-light border-2 border">
                        <h1>
                            Your Reservations
                        </h1>
                        <h1>
                            <div className="row">
                                <div className="col-6">
                                    <button onClick={getAllReservations} className="btn btn-primary ms-3 mt-2">
                                        Show ALL Reservations
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button onClick={getUnpaidReservations} className="btn btn-primary ms-3 mt-2">
                                        Show UNPAID Reservations
                                    </button>
                                </div>
                            </div>
                        </h1>
                        <ul className="list-group">
                            {
                                reservations.map(res =>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-9">
                                                <div>
                                                    Reservation Number: {res._id}
                                                </div>
                                                <div>
                                                    Hotel ID: {res.hotel_id}
                                                </div>
                                                <Link to={{pathname: `/hotels/${res.hotel_id}`}}>
                                                    Hotel Details
                                                </Link>
                                                <div>
                                                    Room Number: {res.room_number}
                                                </div>
                                                <div>
                                                    Room Type: {res.room_type}
                                                </div>
                                                <div>
                                                    Room Type: {res.booking_price}
                                                </div>
                                                <div>
                                                    Check-in Date: {moment(res.check_in_date).format('YYYY-MM-DD')}
                                                </div>
                                                <div>
                                                    Number of Nights: {res.duration_days}
                                                </div>
                                                <div>
                                                    Status: {res.payment_status ? "Paid" : "Unpaid"}
                                                </div>
                                                <div>
                                                    Special Request: {res.special_request}
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <button
                                                    className="btn btn-primary mt-3"
                                                    onClick={(e) => handleDeleteReservation(res._id)}>Cancel Reservation</button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </SecureContent>
            </div>
        </div>
    )
}

export default ReservationList;