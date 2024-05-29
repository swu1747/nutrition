import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Logout from "../components/logout.jsx";
import { checkUserphoto } from "../feature/UserInfoSlice.js";

const Main = () => {
    const photo = useSelector(checkUserphoto)
    return (<div>
        <Avatar src={photo}></Avatar>
        I'm Main page
        <Logout />
    </div>)
}
export default Main