import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Logout from "../components/logout.jsx";
import { checkUserphoto } from "../feature/UserInfoSlice.js";

const Main = () => {
    const photo = useSelector(checkUserphoto)
    useEffect(() => {
        axios.get('eat').then((res) => {
            console.log(res)
        })
    })
    return (<div>
        <Avatar src={photo}></Avatar>
        I'm Main page
        <Logout />
    </div>)
}
export default Main