import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useProfile} from "../context/profile-context";

const Signin = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {signin} = useProfile()
    const handleSignin = async () => {
        try {
            await signin(
                emailRef.current.value,
                passwordRef.current.value
            )
            navigate("/hotels")
        } catch (e) {
            alert('user account not found / wrong password')
        }
    }
    const handleSignup = () => {
        navigate(`/signup`)
    }
    return (
        <div>
            <h1>Signin</h1>
            <input ref={emailRef} placeholder="email" className="form-control" type="email"/>
            <input ref={passwordRef} placeholder="password" className="form-control" type="password"/>
            <button onClick={handleSignin} className="btn btn-primary me-3 mt-2">
                Sign In
            </button>
            <button onClick={handleSignup} className="btn btn-primary ms-3 mt-2">
                Sign Up
            </button>
        </div>
    );
};

export default Signin;