import React, {useEffect, useState} from 'react'
import * as hotelService from "../services/hotel-service";
import Nav from "../components/nav";
import {Link, useNavigate} from "react-router-dom";

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate()
    const getHotels = async () => {
        const currHotels = await hotelService.findAllHotels();
        setHotels(currHotels);
    }
    const handleViewHotel = (hotel_id) => {
        navigate(`/hotels/${hotel_id}`)
    }
    useEffect(()=>{
        getHotels();
    }, []);
    return (
        <div className="row">
            <div className="col-2 mt-3">
                <Nav/>
            </div>
            <div className="col-10">
                <div className="container mt-3 border-light border-2 border">
                    <h1>
                        Hotel List
                    </h1>
                    <ul className="list-group">
                        {
                            hotels.map(hot =>
                                <li key="{hot}" className="list-group-item">
                                    <div className="row">
                                        <div className="col-9">
                                            <div>
                                                Hotel Name: {hot.hotel_name}
                                            </div>
                                            <div>
                                                Rating: {hot.star_rating}
                                            </div>
                                            <div>
                                                Address: {hot.street + ", " + hot.city + ", " + hot.state + " " + hot.zip}
                                            </div>
                                            <div>
                                                Phone: {hot.phone_number}
                                            </div>
                                            <div>
                                                Status: {hot.status}
                                            </div>
                                            <div>
                                                Allow Pets: {hot.allow_pet ? "Yes" : "No"}
                                            </div>
                                        </div>
                                        <div className="col-2 float-end">
                                            <button onClick={(e) => {handleViewHotel(hot.hotel_id)}} className="btn btn-primary ms-3 mt-2">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HotelList;