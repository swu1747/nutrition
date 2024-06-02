import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
const Logout = () => {
    const logouthandler = (e) => {
        signOut(auth)
    }
    return (<button onClick={logouthandler}>
        log out
    </button>)
}

export default Logout