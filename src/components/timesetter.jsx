import React, { useState } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { setEnd, setStart, start, end } from "../feature/timeSetterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { changeExpand } from "../feature/calburnslice";
const TimeSetter = () => {
    const dispath = useDispatch()
    const startTime = useSelector(start)
    const endTime = useSelector(end)
    const submithandler = () => {
        dispath(changeExpand(''))
        console.log(startTime.unix() , endTime.unix() )
    }
    return <>
        <Typography>
            start time
        </Typography>
        {
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    value={startTime}
                    onChange={(newValue) => {
                        dispath(setStart(newValue))
                    }}
                />
            </LocalizationProvider>

        }
        <Typography>
            end time
        </Typography>
        {
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    value={endTime}
                    onChange={(newValue) => {
                        dispath(setEnd(newValue))
                    }}
                />
            </LocalizationProvider>

        }
        <Button onClick={submithandler}>clikck</Button>
    </>
}

export default TimeSetter
