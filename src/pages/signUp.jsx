import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { checkSignUpStatus } from "../feature/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signup } from "../feature/signUpSlice";
import { auth } from "../firebase";
import styled from "@emotion/styled";
import useFormInput from "../hooks/useFormInput";
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
    const email = useFormInput('')
    const pwd = useFormInput('')
    const username = useFormInput('')
    const [avartarurl, setavarturl] = useState(null)
    const [preview, setpreview] = useState(null)

    let content
    const signUpHandler = (e) => {
        e.preventDefault()
        dispath(signup({ auth, email: email.value, password: pwd.value, username: username.value, avartarurl }))
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
                <input type='text' value={email.value} onChange={email.onChange} /><br />
                <label>password:</label><br />
                <input type='text' value={pwd.value} onChange={pwd.onChange} /><br />
                <label>username:</label><br />
                <input type='text' value={username.value} onChange={username.onChange} /><br />
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