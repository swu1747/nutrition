import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Badge } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import MyGauge from "./mygauge.jsx";
import { useDispatch } from "react-redux";

const MyCalendar = ({ drawerHandler, currentdateHandler, monthlyhander, dayhander, cal, color = '#DE3163' }) => {
    const dispath = useDispatch()
    useEffect(() => {
        const current = dayjs()
        const start = current.startOf('month').format('MM-DD-YYYY')
        const end = current.endOf('month').format('MM-DD-YYYY')
        dispath(monthlyhander({ start, end }))
    }, [])
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            // defaultValue={initial}
            disableHighlightToday={true}
            disableFuture={true}
            onChange={(date) => {
                const currentdate = date.format('MM-DD-YYYY')
                dispath(dayhander(currentdate))
                drawerHandler()
                currentdateHandler(currentdate)
            }}
            onMonthChange={(date) => {
                const start = date.startOf('month').format('MM-DD-YYYY')
                const end = date.endOf('month').format('MM-DD-YYYY')
                dispath(monthlyhander({ start, end }))
            }}
            // renderLoading={() => <DayCalendarSkeleton sx={{ width: 400 }} />}
            slots={{
                day: ({ day, outsideCurrentMonth, ...others }) => {
                    const date = day.format('MM-DD-YYYY')
                    return (<Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={!outsideCurrentMonth ? <MyGauge val={cal[date] ? +cal[date] : 0} width={30} height={30} rad={8} color={color} /> : null}
                    >
                        <PickersDay
                            outsideCurrentMonth={outsideCurrentMonth}
                            day={day} {...others} />
                    </Badge>)
                }
            }} />
    </LocalizationProvider>)
}
export default MyCalendar