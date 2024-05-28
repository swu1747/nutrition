import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const emailhandler = (e) => {
        setEmail(e.target.value)
    }
    const pwdHandler = (e) => {
        setPwd(e.target.value)
    }
    const navi = useNavigate()
    const loginHandler = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, pwd).then((userCredential) => {
            navi('/')
        }).catch((err) => {
            console.log('err', err)
        })
        setEmail('')
        setPwd('')
    }
    return <div>
        <form onSubmit={loginHandler}>
            <label>email:</label><br />
            <input type="text" value={email} onChange={emailhandler} /><br />
            <label>password:</label><br />
            <input type="text" value={pwd} onChange={pwdHandler} /><br />
            <input type='submit' value='Log In' />
        </form>
        <Link to='/signup' >Sign Up</Link>
    </div>
}
export default SignIn