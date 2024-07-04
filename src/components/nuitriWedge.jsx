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
    return (<Card sx={{ display: "flex", width: '100%', justifyContent: 'space-between',  flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300 }}>
            <CardContent>
                <Typography component='div' variant="h4">TODAY Nuitruition</Typography>
                <Sliders value={x.fat} total={60} item='fat' />
                <Sliders value={x.protein} total={60} item='protein' />
                <Sliders value={x.carbohydrate} total={300} item='carbohydrate' />
            </CardContent>

        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <MyGauge val={x.calories} color='#50C878' />
            <Typography variant="h6" color="text.secondary" component="div" >
                Calories intake : {x.calories}/2000 Cal
            </Typography>
        </Box>

    </Card>)
}

export default NuitriWedge

