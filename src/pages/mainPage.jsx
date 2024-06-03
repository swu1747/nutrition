import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../components/logout.jsx";
import { checkUserphoto } from "../feature/UserInfoSlice.js";

const Main = () => {
    const photo = useSelector(checkUserphoto)
    useEffect(() => {

    })
    return (<div>
        <Avatar src={photo}></Avatar>
        I'm Main page
        <Logout />
        <Link to='/fitness' >fitness</Link>
    </div>)
}
export default Main