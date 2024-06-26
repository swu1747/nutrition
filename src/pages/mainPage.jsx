import { Avatar, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../components/logout.jsx";
import { checkUserphoto } from "../feature/UserInfoSlice.js";
import CalWedge from "../components/calWedge.jsx";
import NuitriWedge from "../components/nuitriWedge.jsx";
import Last7Days from "../components/Last7Days.jsx";
const Main = () => {
    const photo = useSelector(checkUserphoto)
    useEffect(() => {

    })
    return (<div>
        <Avatar src={photo}></Avatar>
        <Logout /><br />
        <Stack spacing={2}>
            <CalWedge />
            <NuitriWedge />
            <Last7Days/>
        </Stack >
        <Link to='/fitness' >fitness</Link><br />
        <Link to='/record'>record</Link>
    </div>)
}
export default Main