import React, {useEffect, useState} from 'react'
import SecureContent from "../components/secure-content";
import * as reservationService from "../services/reservation-service";
import Nav from "../components/nav";
import {useProfile} from "../context/profile-context";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";

const Invoice = () => {
    const [reservations, setReservations] = useState([]);
    const {profile} = useProfile();
    const navigate = useNavigate();
    const getUnpaidReservations = async () => {
        const currReservations = await reservationService.findUnpaidUserReservations(profile.email);
        setReservations(currReservations);
    }
    const handlePayment = async () => {
        if (profile) {
            await reservationService.markReservationAsPaid(profile.email)
        }
        window.location.reload(false)
    }
    useEffect(()=>{
        getUnpaidReservations();
    }, []);
    let amount_due = 0;
    for (let i=0; i<reservations.length; i++) {
        amount_due += reservations[i].booking_price * reservations[i].duration_days;
    }
    return (
        <div className="row">
            <div className="col-2 mt-3">
                <Nav/>
            </div>
            <div className="col-10">
                <SecureContent>
                    <div className="container mt-3 border-light border-2 border">
                        <h1>
                            Your Unpaid Reservations
                        </h1>
                        <ul className="list-group">
                            {
                                reservations.map(res =>
                                    <li className="list-group-item row">
                                        <div>
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
                                    </li>
                                )
                            }
                        </ul>
                        <h1>
                            Your Amount Due: ${amount_due}
                        </h1>
                        <div>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={handlePayment}>Make Payment</button>
                        </div>
                    </div>
                </SecureContent>
            </div>
        </div>
    )
}

export default Invoice;