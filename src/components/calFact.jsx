import React from "react";
import { useSelector } from "react-redux";
import { getServing } from "../feature/foodDetailSlice";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { Paper } from "@mui/material";

const CalFact = ({ cur }) => {
    const cal = useSelector((state) => {
        return getServing(state, cur)
    })
    const sum = Math.round((+cal.fat + (+cal.protein) + (+cal.carbohydrate)) * 100) / 100
    const data1 = [
        { id: 0, value: cal.fat, label: `${Math.round((+(cal.fat) / sum) * 100)}% fat: ${Math.round(+cal.fat * 100) / 100} g`, color: '#5BD1D7' },
        { id: 1, value: cal.protein, label: `${Math.round((+(cal.protein) / sum) * 100)}% protein: ${Math.round(+cal.protein * 100) / 100} g`, color: '#F0BF4C' },
        { id: 2, value: cal.carbohydrate, label: `${Math.round((+(cal.carbohydrate) / sum) * 100)}% carb: ${Math.round(+cal.carbohydrate * 100) / 100} g`, color: '#F59794' },
    ]
    const data2 = [
        { value: Math.round(cal.calories), color: 'black' }
    ]
    const series = [
        {
            data: data1,
            innerRadius: 100,
            outerRadius: 120,
            cornerRadius: 14,
            paddingAngle: 2
        },
        {
            data: data2,
            innerRadius: 0,
            outerRadius: 90,
            arcLabel: (item) => `${item.value} \n Calories`,
        }
    ]
    return <>
        <PieChart
            series={series}
            width={600}
            height={600}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                    fontSize: 20,
                    whiteSpace: 'pre-line'
                }
            }}
        />
        <Paper elevation={3} sx={{
            width: 500,
            height: 400,

        }}></Paper>
    </>
}

export default CalFact