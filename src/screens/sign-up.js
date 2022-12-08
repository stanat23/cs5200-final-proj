import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {useProfile} from "../context/profile-context";

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {signup} = useProfile()
    const handleSignup = async () => {
        try {
            await signup(
                emailRef.current.value,
                passwordRef.current.value
            )
            navigate('/hotels')
        } catch (e) {
            alert('oops')
        }
    }
    return (
        <div>
            <h1>Signup</h1>
            <input ref={emailRef} placeholder="email" className="form-control" type="email"/>
            <input ref={passwordRef} placeholder="password" className="form-control" type="password"/>
            <button onClick={handleSignup} className="btn btn-primary mt-2">
                Sign Up
            </button>
        </div>
    );
};

export default Signup;