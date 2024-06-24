import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../components/logout.jsx";
import { checkUserphoto } from "../feature/UserInfoSlice.js";
import CalWedge from "../components/calWedge.jsx";

const Main = () => {
    const photo = useSelector(checkUserphoto)
    useEffect(() => {

    })
    return (<div>
        <Avatar src={photo}></Avatar>
        <Logout /><br />
        <CalWedge />
        <Link to='/fitness' >fitness</Link><br />
        <Link to='/record'>record</Link>
    </div>)
}
export default Main