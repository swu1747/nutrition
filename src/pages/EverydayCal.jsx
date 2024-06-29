import { Typography, Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getsingledaycaldetail, getsingledaycal } from "../clientapi";
import CalDChart from "../components/caldetailchat.jsx";
import MyGauge from '../components/mygauge.jsx'
import CalDtable from "../components/calDtable.jsx";
import MyCalendar from "../components/Mycalendar.jsx";
const EverdayCal = () => {
    const param = useParams()
    const [caldetail, changecaldetail] = useState(new Array(24).fill(0))
    const [totalCal, changetotalCal] = useState(0)
    const [detail, setdetail] = useState([])

    useEffect(() => {
        const date = param.date
        const cal = new Array(24).fill(0)
        Promise.all([getsingledaycaldetail(date), getsingledaycal(date)]).then((res) => {
            res[0].data.forEach((item) => {
                const calpermin = +item.calpermin
                const start = dayjs(item.starttime)
                const end = dayjs(item.endtime)
                let startH = start.hour()
                let endH = end.hour()
                let startM = start.minute()
                let endM = end.minute()
                if (startH === endH) {
                    cal[startH] += (endM - startM) * calpermin
                } else {
                    cal[startH] += (60 - startM) * calpermin
                    startH++
                    cal[endH] += endM * calpermin
                    while (startH < endH) {
                        cal[startH] += 60 * calpermin
                        startH++
                    }
                }
            })
            const calories = res[1].data[0] ? +res[1].data[0].cal_toal : 0
            setdetail(res[0].data)
            changetotalCal(calories)
            changecaldetail(cal)
        })
    }, [])
    return <Stack spacing={2} sx={{ justifyContent: "flex-end" }} >
        <MyCalendar />
        <Container maxWidth="false">
            <MyGauge val={totalCal} color='#DE3163' width={350} height={350} rad={100} />
        </Container>
        <Box display='flex' flexDirection='column'>
            <Typography variant="h5">Cal Burn</Typography>
            <Typography color='#DE3163'>{totalCal}/2000 CAL</Typography>
        </Box>
        <CalDChart cal={caldetail} />
        <CalDtable detail={detail} />
    </Stack>
}

export default EverdayCal