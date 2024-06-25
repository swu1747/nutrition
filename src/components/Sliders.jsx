import React from "react";
import { Box, Typography } from "@mui/material";
const Sliders = ({ item, value, total }) => {
    let color
    if (item === 'fat')
        color = '#5BD1D7'
    if (item === 'protein')
        color = '#F0BF4C'
    if (item === 'carbohydrate')
        color = '#F59794'
    return <Box sx={{
        marginTop: 2,
        marginBottom: 1,
    }}>
        <Box sx={{
            backgroundColor: '#C0C0C0',
            height: 8,
            borderRadius: 2
        }}>
            <Box sx={{
                backgroundColor: `${color}`,
                height: 8,
                width: `${value / total * 100}%`,
                borderRadius: 2
            }}></Box>
        </Box>
        <Box justifyContent="space-between" display='flex'>
            <Typography>{item}</Typography>
            <Typography >{`${value}/${total} g`}</Typography>
        </Box>
    </Box>
}

export default Sliders