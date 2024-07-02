import React, { useState } from "react";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import ModeSharpIcon from '@mui/icons-material/ModeSharp';
import { BottomNavigation, BottomNavigationAction, Link, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Navi = ({ n }) => {
    const navigate = useNavigate()
    return (<Box sx={{ width: 450, position: 'fixed', bottom: 0 }}>
        <BottomNavigation
        sx={{justifyContent: 'space-around' }}
            showLabels
            value={n}
        >
            <BottomNavigationAction icon={<DashboardCustomizeOutlinedIcon />} label='Dashboard' onClick={() => {
                navigate('/')
            }} />
            <BottomNavigationAction icon={<ModeSharpIcon />} label='Record' onClick={() => {
                navigate('/record')
            }} />
            <BottomNavigationAction icon={<FitnessCenterOutlinedIcon />} onClick={() => {
                navigate('/fitness')
            }} label='Fitness' />
        </BottomNavigation>
    </Box >)
}

export default Navi

