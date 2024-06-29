import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Badge } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import MyGauge from "./mygauge.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlycal } from "../feature/MonthlyCalBurnSlice.js";
import { getdaycal } from "../feature/MonthlyCalBurnSlice.js";
const initial = dayjs()
const MyCalendar = () => {
    const dispath = useDispatch()
    const EachDayCal = useSelector(getdaycal)
    useEffect(() => {
        const current = dayjs()
        const start = current.startOf('month').format('MM-DD-YYYY')
        const end = current.endOf('month').format('MM-DD-YYYY')
        dispath(fetchMonthlycal({ start, end }))
    }, [])
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>

        <DateCalendar
            // defaultValue={initial}
            disableHighlightToday={true}
            disableFuture={true}
            onChange={() => {
            }}
            onMonthChange={(date) => {
                const start = date.startOf('month').format('MM-DD-YYYY')
                const end = date.endOf('month').format('MM-DD-YYYY')
                dispath(fetchMonthlycal({ start, end }))
            }}
            renderLoading={() => <DayCalendarSkeleton sx={{ width: 400 }} />}
            slots={{
                day: ({ day, outsideCurrentMonth, ...others }) => {
                    const date = day.format('MM-DD-YYYY')
                    return (<Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={!outsideCurrentMonth ? <MyGauge val={EachDayCal[date] ? +EachDayCal[date] : 0} width={30} height={30} rad={8} color='#DE3163' /> : null}
                    >
                        <PickersDay
                            // isFirstVisibleCell={false}
                            outsideCurrentMonth={outsideCurrentMonth}
                            day={day} {...others} />
                    </Badge>)
                }
            }} />
    </LocalizationProvider>)
}
export default MyCalendar