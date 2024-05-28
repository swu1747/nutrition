import React, { useState } from "react";
import { Avatar } from "@mui/material";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setpwd] = useState('')
    const [username, setUserNmae] = useState('')
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
        console.log('haha')
     }
    return (<div>
        <form onSubmit={signUpHandler}>
            <label>email:</label><br />
            <input type='text' value={email} onChange={emailhandler}></input><br />
            <label>password:</label><br />
            <input type='text' value={password} onChange={passwordhandler}></input><br />
            <label>username:</label><br />
            <input type='text' value={username} onChange={usernamehandler}></input><br />
            <input type='submit'></input>
        </form>
    </div>)
}
export default SignUp