import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { checkSignUpStatus } from "../feature/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signup } from "../feature/signUpSlice";
import { auth } from "../firebase";

const SignUp = () => {
    const dispath = useDispatch()
    const signUpStatus = useSelector(checkSignUpStatus)
    const [email, setEmail] = useState('')
    const [password, setpwd] = useState('')
    const [username, setUserNmae] = useState('')
    let content
    const emailhandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordhandler = (e) => {
        setpwd(e.target.value)
    }
    const usernamehandler = (e) => {
        setUserNmae(e.target.value)
    }
    const signUpHandler = (e) => {
        e.preventDefault()
        dispath(signup({ auth, email, password }))
    }

    if (signUpStatus === ('idle' || 'failed')) {
        console.log('>>', signUpStatus)
        content = <div>
            <form onSubmit={signUpHandler}>
                <label>email:</label><br />
                <input type='text' value={email} onChange={emailhandler}></input><br />
                <label>password:</label><br />
                <input type='text' value={password} onChange={passwordhandler}></input><br />
                <label>username:</label><br />
                <input type='text' value={username} onChange={usernamehandler}></input><br />
                <input type='submit'></input>
            </form>
        </div>
    } else if (signUpStatus === 'pending') {
        content = <div>creating account...</div>
    } else {
        content = <Navigate to='/' />
    }
    return (content)
}
export default SignUp