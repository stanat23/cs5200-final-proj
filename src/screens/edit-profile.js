import React, { useEffect, useState } from 'react';
import {useProfile} from "../context/profile-context";
import * as userService from "../services/user-service"
import Nav from "../components/nav";
import SecureContent from "../components/secure-content";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const [user, setUser] = useState({});
    const {profile} = useProfile();
    const navigate = useNavigate()
    const getUser = async () => {
        const currUser = await userService.getUser(profile.email)
        setUser(currUser)
    }
    useEffect(()=>{
        getUser();
    }, []);
    function onlyNumbers(str) {
        return /^[0-9]+$/.test(str);
    }
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [phone, setPhone] = useState(user.phone);
    const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth);
    const handleComplete = async (phone, first_name, last_name, date_of_birth) => {
        if (!onlyNumbers(phone)) {
            alert("phone number needs to be all digits!")
            return
        }
        if (phone.length>12 || phone.length<3) {
            alert("phone number too long or too short!")
            return
        }
        await userService.updateUser(profile.email, phone, first_name, last_name, date_of_birth)
        navigate(`/hotels`)
    }
    return (
        <div className="row">
            <div className="col-2 mt-3">
                <Nav/>
            </div>
            <div className="row col-10 mt-3">
                <h1>Edit Profile</h1>
                <SecureContent>
                    <form>
                        <label className="col-6 mt-4 mb-4">
                            <div className="mt-2 mb-2">
                                Current First Name: {user.firstName}
                            </div>
                            <div>
                                New First Name: {" "}
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="col-6 mt-4 mb-4">
                            <div className="mt-2 mb-2">
                                Current Last Name: {user.lastName}
                            </div>
                            <div>
                                Last Name: {" "}
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="col-6 mt-2 mb-4">
                            <div className="mt-2 mb-2">
                                Current Phone Number: {user.phone}
                            </div>
                            <div>
                                Phone Number: {" "}
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="col-6 mt-2 mb-4">
                            <div  className="mt-2 mb-2">
                                Current Date of Birth: {moment(user.date_of_birth).format('YYYY-MM-DD')}
                            </div>
                            <div>
                                Date of Birth: {" "}
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </div>
                        </label>
                    </form>
                    <button
                        className="btn btn-primary mt-4 float-end"
                        onClick={(e) => handleComplete(phone, firstName, lastName, dateOfBirth)}>Complete Edit</button>
                </SecureContent>
            </div>
        </div>
    )
}

export default EditProfile;
