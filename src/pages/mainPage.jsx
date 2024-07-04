import { Avatar, Stack, Link, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Logout from "../components/logout.jsx";
import { checkUserphoto } from "../feature/UserInfoSlice.js";
import CalWedge from "../components/calWedge.jsx";
import NuitriWedge from "../components/nuitriWedge.jsx";
import Last7DaysWidge from "../components/Last7Days.jsx";
import dayjs from "dayjs";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";

const Main = () => {
    const today = dayjs().format('MM-DD-YYYY')
    // const photo = useSelector(checkUserphoto)
    return (
        <>
            <Stack spacing={2} width='100%'>
                <TopNavi display='Summary' />
                <Link component={RouterLink} underline="none" to={`/daycal/${today}`} ><CalWedge /></Link>
                <Link component={RouterLink} underline="none" to={`/daynutri/${today}`} ><NuitriWedge /></Link>
                <Link component={RouterLink} underline="none" to={`/last7days`} ><Last7DaysWidge /></Link>
                <Navi n={0} />
            </Stack >
        </>
    )
}
export default Main