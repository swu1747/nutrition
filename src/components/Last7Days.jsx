import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getrangedaynuitri, getrangeddayscal } from "../clientapi";
import { Card, CardContent, Typography } from "@mui/material";
import MyGauge from "./mygauge.jsx";

const Last7Days = () => {
    const [caltake, changecaltake] = useState(0)
    const [calburn, changecalbun] = useState(0)
    useEffect(() => {
        const temp = dayjs()
        const last7day = temp.subtract(7, 'day').format('YYYY-MM-DD')
        const today = temp.format('YYYY-MM-DD')
        const daycaltakein = new Set()
        Promise.all([getrangedaynuitri(last7day, today), getrangeddayscal(last7day, today)]).then((res) => {
            let totalcaltakin = 0, totalcalburn = 0
            res[0].data.forEach((cal) => {
                const temp = dayjs(cal.time).format('YYYY-MM-DD')
                if (!daycaltakein.has(temp)) {
                    daycaltakein.add(temp)
                }
                totalcaltakin += +cal.calories
            })

            res[1].data.forEach((burn) => {
                totalcalburn += +burn.cal_toal
            })

            const avecal = Math.floor(totalcaltakin / 7)
            const avecalburn = Math.floor(totalcalburn / 7)
            changecalbun(avecalburn)
            changecaltake(avecal)
        })

    }, [])
    return (<Card sx={{ width: 450, display: 'flex', justifyContent: 'space-between' }}>
        <CardContent>
            <Typography>
                Average Cal Burn last 7 days
            </Typography>
            <MyGauge val={calburn} color='#DE3163' />

            <Typography>
                {calburn}/2000 Cal
            </Typography>
        </CardContent>
        <CardContent>
            <Typography>
                Average Cal take-in last 7 days
            </Typography>
            <MyGauge val={caltake} color={'#50C878'} />

            <Typography>
                {caltake}/2000 Cal
            </Typography>
        </CardContent>
    </Card>)
}

export default Last7Days