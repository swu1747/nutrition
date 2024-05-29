import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { checkSignUpStatus } from "../feature/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signup } from "../feature/signUpSlice";
import { auth } from "../firebase";
import styled from "@emotion/styled";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SignUp = () => {
    const dispath = useDispatch()
    const signUpStatus = useSelector(checkSignUpStatus)
    const [email, setEmail] = useState('')
    const [password, setpwd] = useState('')
    const [username, setUserNmae] = useState('')
    const [avartarurl, setavarturl] = useState(null)
    const [preview, setpreview] = useState(null)

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
        dispath(signup({ auth, email, password, username, avartarurl }))
    }
    const avatarhandler = (e) => {
        const avatar = e.target.files[0]
        if (avatar) {
            setpreview(URL.createObjectURL(avatar))
        }
        setavarturl(avatar)
    }
    if (signUpStatus === 'idle' || signUpStatus === 'failed') {
        content = <div>
            <form onSubmit={signUpHandler}>
                <label>email:</label><br />
                <input type='text' value={email} onChange={emailhandler} /><br />
                <label>password:</label><br />
                <input type='text' value={password} onChange={passwordhandler} /><br />
                <label>username:</label><br />
                <input type='text' value={username} onChange={usernamehandler} /><br />
                <input type='submit' />
            </form>
            <Avatar src={preview}></Avatar>
            <Button component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}>Choose Avatar <VisuallyHiddenInput onChange={avatarhandler} type='file' /></Button>
        </div>
    } else if (signUpStatus === 'pending') {
        content = <div>creating account...</div>
    } else {
        content = <Navigate to='/' />
    }
    return (content)
}
export default SignUp