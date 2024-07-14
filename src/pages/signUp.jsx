import React, { useState } from "react";
import { Avatar, Button, Stack, TextField, Box, Typography } from "@mui/material";
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
        content = <Box marginTop={20}>
            <Stack spacing={3} margin='0 auto' width={500}>
                <Box component="img"
                    sx={{
                        height: 150,
                        width: 500,
                    }} src='/logo/Screen Shot 2024-07-12 at 11.23.18 AM.png'
                ></Box>
                <Typography>Please enter Email:</Typography>
                <TextField type='text' label='Email' value={email.value} onChange={email.onChange} />
                <Typography>Please enter password:</Typography>
                <TextField type='password' label='Password' value={pwd.value} onChange={pwd.onChange} />
                <Typography>Please Re-Enter password:</Typography>
                <TextField type='password' label='Re-Enter Password' />
                <Typography>Please enter username:</Typography>
                <TextField type='text' label='username' value={username.value} onChange={username.onChange} />
                <Button component="label"
                    variant="contained"
                    tabIndex={-1} sx={{ width: 150 }}>Choose<nbsp />Avatar<VisuallyHiddenInput onChange={avatarhandler} type='file'
                    /></Button>
                <Avatar src={preview}></Avatar>
                <Box display={'flex'} justifyContent='space-around'><Button onClick={signUpHandler} variant="contained" sx={{ width: 150 }}>Submit</Button></Box>
            </Stack >
        </Box >
    } else if (signUpStatus === 'pending') {
        content = <Box width={400} margin='20 auto'> <Typography variant="h4">Creating Account</Typography></Box>
    } else {
        content = <Navigate to='/' />
    }
    return (content)
}
export default SignUp