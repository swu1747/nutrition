import React from "react";
import dayjs from "dayjs";
import { Badge } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import MyGauge from "./mygauge.jsx";
const initial = dayjs()
const MyCalendar = () => {
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            defaultValue={initial}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
                day: ({ day }) => {

                    return (<Badge
                         overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={<MyGauge val={1000} width={30} height={30} rad={8} />}
                    >
                        <PickersDay day={day} />
                    </Badge>)
                }
            }} />
    </LocalizationProvider>)
}
export default MyCalendar