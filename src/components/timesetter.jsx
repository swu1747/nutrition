import React, { useState } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { setEnd, setStart, start, end } from "../feature/timeSetterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { changeExpand } from "../feature/calburnslice";
import { addcalburn } from "../clientapi";
const TimeSetter = ({ value, exercise }) => {
    const dispath = useDispatch()
    const startTime = useSelector(start)
    const endTime = useSelector(end)
    const submithandler = () => {
        dispath(changeExpand(''))
        const calpermin = Math.floor(value / 60)
        const totalCal = Math.floor(calpermin * ((endTime.unix() - startTime.unix()) / 60))
        if (endTime.diff(startTime) > 0) {
            addcalburn(exercise, startTime.format(), endTime.format(), calpermin, totalCal).then((res) => {
                console.log(res)
            })
        } else {
            console.log('invalid time')
        }
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
