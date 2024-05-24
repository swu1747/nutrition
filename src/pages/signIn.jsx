import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const emailhandler = (e) => {
        setEmail(e.target.value)
    }
    const pwdHandler = (e) => {
        setPwd(e.target.value)
    }
    const loginHandler = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, pwd).then((a) => {
            console.log('>>>', a)
        }).catch((err) => {
            console.log('err', err)
        })
        setEmail('')
        setPwd('')
    }
    return <div>
        <form onSubmit={loginHandler}>
            <label>email:</label><br />
            <input type="text" value={email} onChange={emailhandler} />
            <input type="text" value={pwd} onChange={pwdHandler} />
            <input type='submit' value='Log In' />
        </form>
    </div>
}
export default SignIn