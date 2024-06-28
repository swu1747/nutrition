import { Avatar, Stack, Link, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Logout from "../components/logout.jsx";
import { checkUserphoto } from "../feature/UserInfoSlice.js";
import CalWedge from "../components/calWedge.jsx";
import NuitriWedge from "../components/nuitriWedge.jsx";
import Last7Days from "../components/Last7Days.jsx";
import dayjs from "dayjs";

const Main = () => {
    const today = dayjs().format('MM-DD-YYYY')
    const photo = useSelector(checkUserphoto)
    return (<div>
        <Avatar src={photo}></Avatar>
        <Logout /><br />
        <Stack spacing={2}>
            <Link component={RouterLink} underline="none" to={`/daycal/${today}`} ><CalWedge /></Link>
            <Link component={RouterLink} underline="none" to={`/daynutri/${today}`} ><NuitriWedge /></Link>
            <Last7Days />
        </Stack >
        <Link variant="contained" component={RouterLink} to='/fitness' >
            <Button>fitness</Button></Link><br />
        <Link variant="contained" component={RouterLink} to='/record'>
            <Button>record</Button></Link>
    </div >)
}
export default Main