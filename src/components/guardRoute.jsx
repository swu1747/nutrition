import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { changeUserState, checkUserStat } from "../feature/UserInfoSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch()
    const login = useSelector(checkUserStat)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(changeUserState('login'))
                user.getIdToken().then((token) => {
                    console.log('i am token', token)
                })
            } else {
                dispatch(changeUserState('logout'))
            }
        })
    })
    return (login === 'idle' ? <div>...loging in</div> : login === 'login' ? children : <Navigate to='signin' replace={true} />)
}
export default PrivateRoute