import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import dayjs from "dayjs";
import { getsingledaycal } from "../clientapi";

const CalWedge = () => {
    const [cal, setcal] = useState(0)
    useEffect(() => {
        const today = dayjs().format('YYYY-MM-DD')
        const getCal = async () => {
            const res = await getsingledaycal(today)
            if (res.data.length == 0) {
                setcal(0)
            } else {
                setcal(Math.floor(+ res.data[0].cal_toal))
            }
        }
        getCal()
    }, [])
    return (<Card sx={{ display: 'flex', width: 450 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
                <Typography component='div' variant="h4">TODAY</Typography>
                <Typography variant="h5" color="text.secondary" component="div" marginTop={10}>
                    Calorie Burn:{cal}/2000
                </Typography>
            </CardContent>
        </Box>
        <Gauge width={200} height={200} value={cal / 2000 * 100} text='' cornerRadius="50%" innerRadius={55} sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
            },
            [`& .${gaugeClasses.valueArc}`]: {
                fill: '#DE3163	',
            },
            [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
            },
        })} />
    </Card>)
}

export default CalWedge