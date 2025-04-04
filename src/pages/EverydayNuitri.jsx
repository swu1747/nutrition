import { Box, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MyGauge from "../components/mygauge.jsx";
import { getdaynutri, getdaynutrilog, getmonthlynutri } from "../feature/everydaynutri.js";
import Sliders from "../components/Sliders.jsx";
import MyCalendar from "../components/Mycalendar.jsx";
import { Drawer, AppBar, IconButton, Toolbar } from "@mui/material";
import dayjs from "dayjs";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import { useState } from "react";
import { fetchRangeDnutri, fetchdaynutri } from "../feature/everydaynutri.js";
import Navi from "../components/Navi.jsx";
import { useNavigate } from "react-router-dom";

const limit = {
    fat: 60,
    saturated_fat: 22,
    protein: 60,
    carbohydrate: 300,
    cholesterol: 300,
    sodium: 2300,
    potassium: 3400,
    fiber: 38,
    sugar: 36,
    vitamin_a: 900,
    vitamin_c: 1000,
    calcium: 1000,
    iron: 8
}
const unit = {
    fat: 'g',
    saturated_fat: 'g',
    protein: 'g',
    carbohydrate: 'mg',
    cholesterol: 'mg',
    sodium: 'mg',
    potassium: 'mg',
    fiber: 'g',
    sugar: 'g',
    vitamin_a: 'mcg',
    vitamin_c: 'mcg',
    calcium: 'mg',
    iron: 'mg'
}
const EverydayNutri = () => {
    const Nav = useNavigate()
    const daynutri = useSelector(getdaynutri)
    const [drawer, setdrawer] = useState(false)
    const [currentdate, setcurrentdate] = useState(dayjs().format('MM-DD-YYYY'))
    const monthlydaynutri = useSelector(getmonthlynutri)
    const drawerHandler = () => {
        const temp = drawer
        setdrawer(!temp)
    }
    const currentdateHandler = (date) => {
        setcurrentdate(date)
    }
    return (
        <>        <AppBar position="static">
            <Toolbar sx={{ display: "flex" }}>
                <IconButton color="inherit" onClick={() => {
                    Nav('/')
                }} >
                    <ArrowBackIosNewTwoToneIcon fontSize="large" />
                </IconButton>
                <Typography variant="h4" align='center' sx={{ flexGrow: 3 }}> Current Date: {currentdate} </Typography>
                <IconButton color="inherit" onClick={drawerHandler}>
                    <CalendarMonthIcon fontSize="large" />
                </IconButton>
            </Toolbar>
        </AppBar>
            <Stack>
                <Container>
                    <Box width={500} margin='0 auto'>
                        <MyGauge val={daynutri.calories} width={500} height={500} color='#50C878' rad={120} />
                    </Box>
                </Container>
                <Typography variant="h3">
                    Calories Intake:
                </Typography>
                <Typography variant="h4">
                    {daynutri.calories}/2000 Cal
                </Typography>
                <Stack width={800} height={800} overflow='auto'>
                    {Object.keys(daynutri).map((key) => {
                        if (!limit[key]) {
                            return null
                        } else {
                            return <Sliders key={key} free={true} value={daynutri[key]} item={key} total={limit[key]} unit={unit[key]} />
                        }
                    })}
                </Stack>
                <Drawer anchor="top" open={drawer}>
                    <MyCalendar drawerHandler={drawerHandler} currentdateHandler={currentdateHandler} monthlyhander={fetchRangeDnutri} dayhander={fetchdaynutri} cal={monthlydaynutri} color='#50C878' />
                </Drawer>
                <Navi n={0} />
            </Stack></>)
}

export default EverydayNutri