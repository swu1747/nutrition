import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getrangedaynuitri, getrangeddayscal } from "../clientapi";
import { Card, CardContent, Container, Typography,Box } from "@mui/material";
import MyGauge from "./mygauge.jsx";
import { useNavigate } from "react-router-dom";

const Last7Days = () => {
    const nav = useNavigate()
    const [caltake, changecaltake] = useState(0)
    const [calburn, changecalbun] = useState(0)
    const [last7daysnutri, setlast7daysnutri] = useState(new Array(7).fill(0))
    const [last7dayscal, setlast7dayscal] = useState(new Array(7).fill(0))
    useEffect(() => {
        const temp = dayjs()
        const last7day = temp.subtract(6, 'day').format('YYYY-MM-DD')
        const today = temp.format('YYYY-MM-DD')
        const daycaltakein = new Set()
        Promise.all([getrangedaynuitri(last7day, today), getrangeddayscal(last7day, today)]).then((res) => {
            let totalcaltakin = 0, totalcalburn = 0
            const a = last7daysnutri
            const b = last7dayscal
            res[0].data.forEach((cal) => {
                const date = dayjs(cal.time)
                const temp1 = date.format('YYYY-MM-DD')
                if (!daycaltakein.has(temp1)) {
                    daycaltakein.add(temp1)
                }
                totalcaltakin += +cal.calories
                const day = temp.diff(date, 'd')
                a[day] += +cal.calories
            })
            a.reverse()
            res[1].data.forEach((burn) => {
                totalcalburn += +burn.cal_toal
                const date = dayjs(burn.date)
                const day = temp.diff(date, 'd')
                b[day] += +burn.cal_toal
            })
            b.reverse()
            const avecal = Math.floor(totalcaltakin / 7)
            const avecalburn = Math.floor(totalcalburn / 7)
            changecalbun(avecalburn)
            changecaltake(avecal)
            setlast7daysnutri(a)
            setlast7dayscal(b)
        })

    }, [])
    return (<Card sx={{ width: '100%', flexGrow: 2, display: 'flex', justifyContent: 'space-between' }}>
        <CardContent>
            <Typography variant="h3" color={'#5a5a5a'}>
                Avg Cals Burn
            </Typography>
            <Container><Box width={450} margin='0 auto'>
                <MyGauge val={calburn} width={300} height={300} rad={70} color='#DE3163' />
            </Box>
            </Container>
            <Typography variant="h4" color={'#808080'}>
                {calburn}/2000 Cals in last 7 days
            </Typography>
        </CardContent>
        <CardContent>
            <Typography variant="h3" color={'#5a5a5a'}>
                Avg Cals In-Take
            </Typography>
            <Container><Box width={450} margin='0 auto'>

                <MyGauge width={300} height={300} val={caltake} rad={70} color='#50C878' />
            </Box>
            </Container>
            <Typography variant="h4" color={'#808080'}>
                {caltake}/2000 Cals in last 7 days
            </Typography>
        </CardContent>
    </Card>)
}

export default Last7Days