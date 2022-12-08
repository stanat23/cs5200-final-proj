import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as hotelService from "../services/hotel-service";
import * as roomService from "../services/room-service";
import * as reservationService from "../services/reservation-service";
import SecureContent from "../components/secure-content";
import {useProfile} from "../context/profile-context";
import Nav from "../components/nav";

const HotelDetails = () => {
    const {profile} = useProfile()
    const [hotelDetails, setHotelDetails] = useState({})
    const [roomTypes, setRoomTypes] = useState([])
    const [nights, setNights] = useState(1);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [amenities, setAmenities] = useState([])
    const [specialRequest, setSpecialRequest] = useState(" ");
    const {hotelId} = useParams();
    const handleAddReservation = async (room_number, room_type, booking_price) => {
        if (profile) {
            const rsp = await reservationService.addReservation(room_number, room_type, hotelId, profile.email, checkInDate, nights, booking_price, specialRequest)
            if (rsp.err) {
                alert("Something Wrong with Your Request!")
            } else {
                alert("Hotel Room Successfully Booked!")
            }
        }
    }
    const searchHotelById = async () => {
        const hotel_details = await hotelService.findHotelById(hotelId);
        setHotelDetails(hotel_details);
        setAmenities(hotel_details.amenities);
    }
    const getRoomTypes = async () => {
        const room_details = await roomService.findRoomByHotel(hotelId);
        setRoomTypes(room_details);
    }
    const handleCheckInDateChange = (event) => {
        setCheckInDate(event.target.value);
    }
    const handleNightsChange = (event) => {
        setNights(event.target.value);
    }
    const handleSpecialRequestChange = (event) => {
        setSpecialRequest(event.target.value);
    }
    useEffect(()=>{
        searchHotelById();
        getRoomTypes();
    }, []);
    return (
        <div className="row">
            <div className="col-2 mt-3">
                <Nav/>
            </div>
            <div className="row col-10">
                <h1 className="ms-2 mt-2">{hotelDetails.hotel_name || ""}</h1>
                <div>
                    <div className="ms-2">Hotel Rating: {hotelDetails.star_rating || ""}</div>
                    <div className="ms-2">Status: {hotelDetails.status || ""}</div>
                    <div className="ms-2">Address: {hotelDetails.street + ", " + hotelDetails.city + ", " + hotelDetails.state + " " + hotelDetails.zip}</div>
                    <div className="ms-2">Phone Number: {hotelDetails.phone_number || ""}</div>
                </div>
                <div className={"container"}>
                    <h2 className="ms-2 mt-2">
                        Hotel Amenities:
                    </h2>
                    <p className="ms-2">
                        {amenities.map(am =>
                            <span className="ms-2"> {am}</span>)}
                    </p>
                </div>
                <div className="container">
                    <h2 className="ms-2 mt-2">
                        Hotel Description:
                    </h2>
                    <p className="ms-2">
                        {hotelDetails.description}
                    </p>
                </div>
                <div className="container mb-5">
                    <h2 className="ms-2 mt-2 mb-3">
                        Make Reservation:
                    </h2>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <label className="me-4">Enter Check-in Date: {" "}
                                    <input
                                        type="date"
                                        placeholder="Please enter a date"
                                        value={checkInDate}
                                        onChange={handleCheckInDateChange}
                                    />
                                </label>
                            </div>
                            <div className="col-6">
                                <label className="me-4">Enter Nights: {" "}
                                    <input
                                        type="number"
                                        placeholder="Please enter number of nights"
                                        value={nights}
                                        onChange={handleNightsChange}
                                    />
                                </label>
                            </div>
                            <div className="col-12">
                                <label>Special Request:
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            placeholder="Please enter any special request"
                                            value={specialRequest}
                                            onChange={handleSpecialRequestChange}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <ul className="list-group">
                    {
                        roomTypes.map(room =>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-7">
                                        <div>
                                            Room Number: {room.room_number}
                                        </div>
                                        <div>
                                            Room Type: {room.room_type}
                                        </div>
                                        <div>
                                            Price: {room.booking_price}
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <SecureContent>
                                            <button
                                                className="btn btn-primary mt-3"
                                                onClick={(e) => handleAddReservation(room.room_number, room.room_type, room.booking_price)}>Reserve Room</button>
                                        </SecureContent>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>

        </div>
    );
};

export default HotelDetails;