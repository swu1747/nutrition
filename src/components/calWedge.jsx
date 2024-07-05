import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
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
    return (<Card sx={{ display: 'flex', width: '100%', flexGrow: 1, justifyContent: 'space-between' ,height:'100%'}}>
        <Box >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
                <Stack spacing={3}>
                    <Typography component='div' variant="h2" fontWeight={20} >TODAY</Typography>
                    <Typography component='div' variant="h3" fontWeight={60} >Calories Burn </Typography>
                    <Typography variant="h2" color="text.secondary" component="div" >
                        {cal}/2000 Cals
                    </Typography>
                </Stack>

            </CardContent>
        </Box>
        <Box>
            <MyGauge val={cal} color='#DE3163' />
        </Box>

    </Card>)
}

export default CalWedge