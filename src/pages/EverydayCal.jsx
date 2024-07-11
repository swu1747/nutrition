import { Typography, Box, Container, AppBar, Toolbar, IconButton, Drawer } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalDChart from "../components/caldetailchat.jsx";
import MyGauge from '../components/mygauge.jsx'
import CalDtable from "../components/calDtable.jsx";
import MyCalendar from "../components/Mycalendar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchcaldetail, getcaldetail, getdetail, gettotalcal } from "../feature/MonthlyCalBurnSlice";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import dayjs from "dayjs";
import { fetchMonthlycal } from "../feature/MonthlyCalBurnSlice.js";
import { getdaycal } from "../feature/MonthlyCalBurnSlice.js";
import Navi from "../components/Navi.jsx";


const EverdayCal = () => {
    const Nav = useNavigate()
    const param = useParams()
    const caldetail = useSelector(getcaldetail)
    const totalCal = useSelector(gettotalcal)
    const detail = useSelector(getdetail)
    const EachDayCal = useSelector(getdaycal)
    const [currentdate, setcurrentdate] = useState(dayjs().format('MM-DD-YYYY'))
    const dispatch = useDispatch()
    const [drawer, setdrawer] = useState(false)
    const drawerHandler = () => {
        const temp = drawer
        setdrawer(!temp)
    }
    const currentdateHandler = (date) => {
        setcurrentdate(date)
    }
    useEffect(() => {
        const date = param.date
        dispatch(fetchcaldetail(date))
    }, [])
    return (<>        <AppBar position="static">
        <Toolbar sx={{ display: "flex" }}>
            <IconButton color="inherit" onClick={() => {
                Nav('/')
            }}>
                <ArrowBackIosNewTwoToneIcon fontSize="large" />
            </IconButton>
            <Typography variant="h4" align='center' sx={{ flexGrow: 3 }}> Current Date: {currentdate} </Typography>
            <IconButton color="inherit" onClick={drawerHandler} >
                <CalendarMonthIcon fontSize="large" />
            </IconButton>
        </Toolbar>
    </AppBar>
        <Stack spacing={2}>
        <Container maxWidth="false">
            <Box margin={'0 auto'} width={500}>
                <MyGauge val={totalCal} color='#DE3163' width={500} height={500} rad={120} />
            </Box>
        </Container>
        <Box display='flex' flexDirection='column'>
            <Typography variant="h3">Cal Burn</Typography>
            <Typography color='#DE3163' variant="h4">{totalCal}/2000 CAL</Typography>
        </Box>
        <Box><CalDChart cal={caldetail} /></Box>
        <CalDtable detail={detail} />
        <Drawer anchor="top" open={drawer}>
            <MyCalendar drawerHandler={drawerHandler} currentdateHandler={currentdateHandler} monthlyhander={fetchMonthlycal} dayhander={fetchcaldetail} cal={EachDayCal} />
        </Drawer>
        <Navi n={0} />
    </Stack></>)

}

export default EverdayCal