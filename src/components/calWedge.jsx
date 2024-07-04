import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import { getsingledaycal } from "../clientapi";
import MyGauge from "./mygauge.jsx";
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
    return (<Card sx={{ display: 'flex', width: '100%', flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent >
                <Typography component='div' variant="h4" >TODAY</Typography>
                <Typography variant="h6" color="text.secondary" component="div" marginTop={10}>
                    Calorie Burn:{cal}/2000 Cal
                </Typography>
            </CardContent>
        </Box>
        <MyGauge val={cal} color='#DE3163' />

    </Card>)
}

export default CalWedge