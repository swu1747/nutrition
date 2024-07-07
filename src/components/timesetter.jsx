import React, { useState } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { setEnd, setStart, start, end } from "../feature/timeSetterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Typography } from "@mui/material";
import { changeExpand } from "../feature/calburnslice";
import { addcalburn } from "../clientapi";
import { changeModal } from "../feature/calburnslice";
// import { MultiSectionDigitalClock } from "@mui/x-date-pickers";
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
                dispath(changeModal())
            })
        } else {
            console.log('invalid time')
        }
    }
    return <Stack>
        <Typography align="center" variant='h3'>
            Start Time
        </Typography>
        {
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <TimePicker sx={{ '& .MuiInputBase-root': { height: 100 }, '& .MuiInputBase-input': { fontSize: 50 } }}

                    value={startTime}
                    onChange={(newValue) => {
                        dispath(setStart(newValue))
                    }}
                />
            </LocalizationProvider>

        }
        <Typography align="center" variant='h3'>
            End Time
        </Typography>
        {
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker sx={{ '& .MuiInputBase-root': { height: 100 }, '& .MuiInputBase-input': { fontSize: 50 } }}
                    value={endTime}
                    onChange={(newValue) => {
                        dispath(setEnd(newValue))
                    }}
                />
            </LocalizationProvider>

        }
        <Button variant="contained" sx={{
            height: 66,
            fontSize: 30
        }} onClick={submithandler}>Submit</Button>
    </Stack>
}

export default TimeSetter
