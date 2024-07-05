import { Card, CardContent, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Sliders from "./Sliders.jsx";
import MyGauge from "./mygauge.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchdaynutri, getdaynutri } from "../feature/everydaynutri";



const NuitriWedge = () => {
    const dispath = useDispatch()
    const x = useSelector(getdaynutri)

    useEffect(() => {
        const today = dayjs().format('YYYY-MM-DD')
        dispath(fetchdaynutri(today))
    }, [])
    return (<Card sx={{ display: "flex", width: '100%', justifyContent: 'space-between', flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
            <CardContent>
                <Typography component='div' variant="h2" fontWeight={20}>TODAY</Typography>
                <Typography component='div' variant="h3" fontWeight={60}>Nutrition</Typography>
                <Sliders value={x.fat} total={60} item='fat' />
                <Sliders value={x.protein} total={60} item='protein' />
                <Sliders value={x.carbohydrate} total={300} item='carbohydrate' />
                <Typography variant="h4" color="text.secondary" component="div" >
                    Calories intake:
                </Typography>
                <Typography variant="h4" color="text.secondary" component="div" >
                    {x.calories}/2000 Cals
                </Typography>
            </CardContent>

        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <MyGauge val={x.calories} color='#50C878' />

        </Box>

    </Card>)
}

export default NuitriWedge

