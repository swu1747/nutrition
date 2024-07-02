import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserphoto } from "../feature/UserInfoSlice";


const TopNavi = ({ display }) => {
    const nav=useNavigate()
    const today = dayjs().format('YYYY-MM-DD')
    const photo = useSelector(checkUserphoto)
    return (
        <AppBar position='static'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack>
                    <Typography variant="h4">{display}</Typography>
                    <Typography variant="h5">{today}</Typography>
                </Stack>
                <Avatar onClick={()=>{
                    nav('/profile')
                }} src={photo} />
            </Toolbar>
        </AppBar>
    )
}

export default TopNavi
