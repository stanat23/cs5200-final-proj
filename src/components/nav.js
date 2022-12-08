import {Link, useNavigate} from "react-router-dom";
import {useProfile} from "../context/profile-context";
import * as service from "../services/auth-service"
import React from "react";

const Nav = () => {
    const {profile} = useProfile();
    const navigate = useNavigate()
    const handleLogOut = async () => {
        await service.logout()
        navigate('/signin')
    }
    return(
        <div className={`list-group`}>
            <Link to="/hotels" className="list-group-item">Hotels</Link>
            <Link to={{pathname: `/reservations/user/${profile && profile.email}`}} className="list-group-item">Reservations</Link>
            <Link to={{pathname: `/invoice/${profile && profile.email}`}} className="list-group-item">Invoice</Link>
            <Link to={{pathname: `/user/${profile && profile.email}`}} className="list-group-item">Profile</Link>
            <button onClick={handleLogOut} className="btn btn-primary list-group-item">
                Log Out
            </button>
            <br/>
        </div>
    );
};
export default Nav;