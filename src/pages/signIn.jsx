import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setStatusIdle } from "../feature/signUpSlice";
import { useDispatch } from "react-redux";
import useFormInput from "../hooks/useFormInput";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { Button, Box, Link } from "@mui/material";

const SignIn = () => {
    const dispath = useDispatch()
    // const [email, setEmail] = useState('')
    const email = useFormInput('')
    const pwd = useFormInput('')

    const navi = useNavigate()
    const loginHandler = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, pwd).then((userCredential) => {
            navi('/')
        }).catch((err) => {
            console.log('err', err)
        })
        email.cleartext()
        pwd.cleartext()
    }
    const signuphandler = () => {
        dispath(setStatusIdle())
    }
    return <Box marginTop={30}>
        <Stack spacing={3} width={500} margin='0 auto'>
            <Box component="img"
                sx={{
                    height: 233,
                    width: 500,
                }} src='/logo/Screen Shot 2024-07-12 at 11.23.18 AM.png'
            ></Box>
            <Box width={300} ><TextField type="text" value={email.value} onChange={email.onChange} variant="outlined" label='Email' sx={
                {
                    width: 400, '.MuiInputBase-input': {
                        height: 30, fontSize: 20,
                    }
                }
            } /></Box>
            <Box width={300} ><TextField type="password" value={pwd.value} onChange={pwd.onChange} variant="outlined" label='Password' sx={
                {
                    width: 400, '.MuiInputBase-input': {
                        height: 30, fontSize: 20,
                    }
                }
            } /></Box>
            <Box sx={{ width: 100, height: 50, fontSize: 50 }}><Button variant='contained' onClick={loginHandler} >Log In</Button></Box>
            <Divider />
            <Typography>Don't have an account yet? <Link component={RouterLink} to='/signup' onClick={signuphandler} >Sign Up now</Link>
            </Typography>
        </Stack>
    </Box>
}
export default SignIn