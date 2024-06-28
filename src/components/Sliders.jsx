import React from "react";
import { Box, Typography } from "@mui/material";
const Sliders = ({ item, value, total, free, height = 8, unit = 'g' }) => {

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
            color = '#DAF7A6'
        } else if (value / total > 0.2 && value / total <= 0.4) {
            color = '#FFC300'
        } else if (value / total > 0.4 && value / total <= 0.6) {
            color = '#FF5733'
        } else if (value / total > 0.6 && value / total <= 0.8) {
            color = '#C70039'
        } else {
            color = '#900C3F'
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
            borderRadius: 2
        }}>
            <Box sx={{
                backgroundColor: `${color}`,
                height: height,
                width: `${width * 100}%`,
                borderRadius: 2
            }}></Box>
        </Box>
        <Box justifyContent="space-between" display='flex'>
            <Typography>{item}</Typography>
            <Typography >{`${val}/${total} ${unit}`}</Typography>
        </Box>
    </Box>
}

export default Sliders