import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserphoto } from "../feature/UserInfoSlice";


const TopNavi = ({ display }) => {
    const nav = useNavigate()
    const d = dayjs()
    const today = d.format('dddd')
    const month = d.format('MMMM')
    const date = d.date()
    const photo = useSelector(checkUserphoto)
    return (
        <AppBar position='static'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack>
                    <Typography variant="h4" fontWeight={10}>{today}, {month} {date}</Typography>
                    <Typography variant="h2" color={'#2d2d2d'} fontWeight={30}>{display}</Typography>
                </Stack>
                <Avatar onClick={() => {
                    nav('/profile')
                }} src={photo} />
            </Toolbar>
        </AppBar>
    )
}

export default TopNavi
