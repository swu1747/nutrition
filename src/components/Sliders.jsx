import React from "react";
import { Box, Typography } from "@mui/material";
const Sliders = ({ item, value, total, free, height = 20, unit = 'g' }) => {

    let color
    if (!free) {
        if (item === 'fat')
            color = '#5BD1D7'
        if (item === 'protein')
            color = '#F0BF4C'
        if (item === 'carbohydrate')
            color = '#F59794'
    } else {
        if (value / total <= 0.2) {
            color = '#b2dfdb'
        } else if (value / total > 0.2 && value / total <= 0.4) {
            color = '#80cbc4'
        } else if (value / total > 0.4 && value / total <= 0.6) {
            color = '#4db6ac'
        } else if (value / total > 0.6 && value / total <= 0.8) {
            color = '#26a69a'
        } else {
            color = '#009688'
        }
    }

    const val = Math.floor(value)
    const width = (value > total) ? 1 : value / total
    return <Box sx={{
        marginTop: 2,
        marginBottom: 1,
    }}>
        <Box sx={{
            backgroundColor: '#C0C0C0',
            height: height,
            borderRadius: 5
        }}>
            <Box sx={{
                backgroundColor: `${color}`,
                height: height,
                width: `${width * 100}%`,
                borderRadius: 5
            }}></Box>
        </Box>
        <Box justifyContent="space-between" display='flex'>
            <Typography variant="h4">{item}</Typography>
            <Typography variant="h4">{`${val}/${total} ${unit}`}</Typography>
        </Box>
    </Box>
}

export default Sliders