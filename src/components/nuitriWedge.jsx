import { Card, CardContent, Box, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { getsdnuitri } from "../clientapi";
import dayjs from "dayjs";
import Sliders from "./Sliders.jsx";


const NuitriWedge = () => {
    const [calorie, setcalorie] = useState(0)
    const [fat, setfat] = useState(0)
    const [protein, setprotein] = useState(0)
    const [carbohydrate, setcarb] = useState(0)
    useEffect(() => {
        const today = dayjs().format('YYYY-MM-DD')
        getsdnuitri(today).then((res) => {
            let cal = 0, fat = 0, protein = 0, carbohydrate = 0
            res.data.forEach((food) => {
                cal += +food.calories
                fat += +food.fat
                protein += +food.protein
                carbohydrate += +food.carbohydrate
            })
            setcalorie(cal)
            setfat(fat)
            setprotein(protein)
            setcarb(carbohydrate)
        })
    }, [])
    return (<Card sx={{ display: "flex", width: 450,justifyContent:'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300 }}>
            <CardContent>
                <Typography component='div' variant="h4">TODAY Nuitruition</Typography>
                <Sliders value={fat} total={60} item='fat' />
                <Sliders value={protein} total={60} item='protein' />
                <Sliders value={carbohydrate} total={300} item='carbohydrate' />
            </CardContent>

        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            < Gauge width={200} height={200} value={calorie / 2000 * 100} text='' cornerRadius="50%" innerRadius={55} sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#50C878',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                },
            })} />
            <Typography variant="h6" color="text.secondary" component="div" >
                Calories intake : {calorie}/2000 Cal
            </Typography>
        </Box>

    </Card>)
}

export default NuitriWedge

