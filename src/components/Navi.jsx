import React, { useState } from "react";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import { BottomNavigation, BottomNavigationAction, Link, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Navi = ({ n }) => {
    const navigate = useNavigate()
    return (<Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
        <BottomNavigation
            sx={{ justifyContent: 'space-around',minHeight:100,fontSize:'60px' }}
            showLabels
            value={n}

        >
            <BottomNavigationAction  icon={< DashboardCustomizeOutlinedIcon fontSize="large" />} label={<Typography fontSize={20}>Dashboard</Typography>} onClick={() => {
                navigate('/')
            }} />
            <BottomNavigationAction icon={<ModeSharpIcon fontSize="large" />} label={<Typography fontSize={20}>Record</Typography>} onClick={() => {
                navigate('/record')
            }} />
            <BottomNavigationAction icon={<FitnessCenterOutlinedIcon fontSize="large" />} onClick={() => {
                navigate('/fitness')
            }} label={<Typography fontSize={20}>Fitness</Typography>} />
        </BottomNavigation>
    </Box >)
}

export default Navi

