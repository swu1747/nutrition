import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { changeUserState, checkUserStat, fetchphoto } from "../feature/UserInfoSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ref, getStorage } from "firebase/storage";
import { Outlet } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
const storage = getStorage()
const PrivateRoute = () => {
    const dispatch = useDispatch()
    const login = useSelector(checkUserStat)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const PhotoRef = ref(storage, user.photoURL);
                user.getIdToken().then((token) => {
                    document.cookie = `token=${token}`
                })
                dispatch(fetchphoto(PhotoRef))
                dispatch(changeUserState('login'))
            } else {
                dispatch(changeUserState('logout'))
            }
        })
    })
    if (login === 'idle') {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress color="primary" size={120} thickness={5} />
        </Box>
    }
    if (login === 'login') {
        return <Outlet />
    }
    if (login === 'logout') {
        return <Navigate to='signin' replace={true} />
    }
}
export default PrivateRoute