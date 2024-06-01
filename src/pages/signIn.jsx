import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { setStatusIdle } from "../feature/signUpSlice";
import { useDispatch } from "react-redux";
import useFormInput from "../hooks/useFormInput";

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
    return <div>
        <form onSubmit={loginHandler}>
            <label>email:</label><br />
            <input type="text" value={email.value} onChange={email.onChange} /><br />
            <label>password:</label><br />
            <input type="text" value={pwd.value} onChange={pwd.onChange} /><br />
            <input type='submit' value='Log In' />
        </form>
        <Link to='/signup' onClick={signuphandler} >Sign Up</Link>
    </div>
}
export default SignIn