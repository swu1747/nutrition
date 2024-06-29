import { Typography, Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getsingledaycaldetail, getsingledaycal } from "../clientapi";
import CalDChart from "../components/caldetailchat.jsx";
import MyGauge from '../components/mygauge.jsx'
import CalDtable from "../components/calDtable.jsx";
import MyCalendar from "../components/Mycalendar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchcaldetail, getcaldetail, getdetail, gettotalcal } from "../feature/MonthlyCalBurnSlice";
const EverdayCal = () => {
    const param = useParams()
    const caldetail = useSelector(getcaldetail)
    const totalCal = useSelector(gettotalcal)
    const detail = useSelector(getdetail)
    const dispatch = useDispatch()

    useEffect(() => {
        const date = param.date
        dispatch(fetchcaldetail(date))
    }, [])
    return <Stack spacing={2} sx={{ justifyContent: "flex-end" }} >
        <MyCalendar />
        <Container maxWidth="false">
            <MyGauge val={totalCal} color='#DE3163' width={350} height={350} rad={100} />
        </Container>
        <Box display='flex' flexDirection='column'>
            <Typography variant="h5">Cal Burn</Typography>
            <Typography color='#DE3163'>{totalCal}/2000 CAL</Typography>
        </Box>
        <CalDChart cal={caldetail} />
        <CalDtable detail={detail} />
    </Stack>
}

export default EverdayCal