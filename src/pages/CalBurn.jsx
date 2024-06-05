import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AppBar, Autocomplete, Button, TextField } from "@mui/material";
import { getCalBurn } from "../clientapi";


const debounce = (func, timeout = 500) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout);
    }
}
const CalBurn = () => {
    const [search, setSearch] = useState('')
    const [searchRes, setSearchRes] = useState([])
    const inputhandler = (e) => {
        const temp = e.target.innerHTML || e.target.value
        setSearch(temp)
        if (e.target.value !== '') {
            getCalBurn({ activity: e.target.value }).then((res) => {
                setSearchRes(res.data)
            })
        }
    }
    const handler = debounce(inputhandler)
    const searchres = () => {
        console.log(search)
    }
    return <>
        <Autocomplete
            freeSolo
            options={searchRes.map((item) => item.name)}
            renderInput={(params) => {
                return <TextField {...params}
                    label='search'
                />
            }}
            label='search'
            onInputChange={handler}
        />
        <Button onClick={searchres}>search</Button></>
}
export default CalBurn

{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
<TimePicker  />
</LocalizationProvider> */}