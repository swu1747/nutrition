import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getrangedaynuitri, getrangeddayscal } from "../clientapi";
import { Card, CardContent, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";

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
            const days = daycaltakein.size
            res[1].data.forEach((burn) => {
                totalcalburn += +burn.cal_toal
            })
            const daysBurn = res[1].data.length
            const avecal = Math.floor(totalcaltakin / days)
            const avecalburn = Math.floor(totalcalburn / daysBurn)
            changecalbun(avecalburn)
            changecaltake(avecal)
        })

    }, [])
    return (<Card sx={{ width: 450, display: 'flex', justifyContent: 'space-between' }}>
        <CardContent>
            <Typography>
                Ave Cal Burn last 7 days
            </Typography>
            <Gauge width={200} height={200} value={calburn / 2000 * 100} text='' cornerRadius="50%" innerRadius={55} sx={(theme) => ({
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
            <Typography>
                {calburn}/2000 Cal
            </Typography>
        </CardContent>
        <CardContent>
            <Typography>
                Ave Cal take-in last 7 days
            </Typography>
            <Gauge width={200} height={200} value={caltake / 2000 * 100} text='' cornerRadius="50%" innerRadius={55} sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#50C878	',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                },
            })} />
            <Typography>
                {caltake}/2000 Cal
            </Typography>
        </CardContent>
    </Card>)
}

export default Last7Days