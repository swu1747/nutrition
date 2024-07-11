import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navi from "../components/Navi.jsx";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { getrangedaynuitri, getrangeddayscal } from "../clientapi/index.js";

const Last7daycal = () => {
    const today = dayjs()
    const last7Days = [];
    const [last7daysnutri, setlast7daysnutri] = useState(new Array(7).fill(0))
    const [last7dayscal, setlast7dayscal] = useState(new Array(7).fill(0))

    for (let i = 0; i < 7; i++) {
        last7Days.unshift(today.subtract(i, 'day').format('YYYY-MM-DD'));
    }

    useEffect(() => {
        const temp = dayjs()
        const last7day = temp.subtract(6, 'day').format('YYYY-MM-DD')
        const today = temp.format('YYYY-MM-DD')
        Promise.all([getrangedaynuitri(last7day, today), getrangeddayscal(last7day, today)]).then((res) => {
            const a = new Array(7).fill(0)
            const b = new Array(7).fill(0)
            res[0].data.forEach((cal) => {
                const date = dayjs(cal.time)
                const day = temp.diff(date, 'd')
                a[day] += +cal.calories
            })
            a.reverse()
            res[1].data.forEach((burn) => {
                const date = dayjs(burn.date)
                const day = temp.diff(date, 'd')
                b[day] += +burn.cal_toal
            })
            b.reverse()
            setlast7daysnutri(a)
            setlast7dayscal(b)
        })

    }, [])
    return <Stack>
        <Typography variant="h3">
            calroies intake
        </Typography>
        <Typography variant="h4">
            in past 7 days
        </Typography>
        <LineChart
            xAxis={[{ scaleType: 'point', data: last7Days, tickFontSize: 15 }]}
            series={[
                {
                    data: last7daysnutri,
                    color: "#50C878"
                }
            ]}
            yAxis={[{ tickFontSize: 15 }]}
            width={800}
            height={600}
        />
        <Typography variant="h3">
            calroies burn
        </Typography>
        <Typography variant="h4">
            in past 7 days
        </Typography>
        <LineChart
            xAxis={[{ scaleType: 'point', data: last7Days, tickFontSize: 15 }]}
            yAxis={[{ tickFontSize: 15 }]}
            series={[
                {
                    data: last7dayscal,
                    color: "#DE3163"

                }
            ]}
            width={800}
            height={600}
        />
        <Navi n={0} />
    </Stack>
}

export default Last7daycal