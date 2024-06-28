import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MyGauge from "../components/mygauge.jsx";
import { getdaynutri, getdaynutrilog } from "../feature/everydaynutri.js";
import Sliders from "../components/Sliders.jsx";
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
    const daynutri = useSelector(getdaynutri)
    const log = useSelector(getdaynutrilog)
    console.log(log, daynutri)
    return (<Stack>
        <MyGauge val={daynutri.calories} width={350} height={350} color='#50C878' rad={100} />
        <Typography variant="h5">
            Calories Intate:
        </Typography>
        <Typography>
            {daynutri.calories}/2000 Cal
        </Typography>
        <Stack width={400}>
            {Object.keys(daynutri).map((key) => {
                if (!limit[key]) {
                    return null
                } else {
                    return <Sliders key={key} free={true} value={daynutri[key]} item={key} total={limit[key]} unit={unit[key]} />
                }
            })}
        </Stack>
    </Stack>)
}

export default EverydayNutri