import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";

const MyGauge = ({ val, width = 500, height = 500, color = '#50C878', rad = 150 }) => {
    return < Gauge width={width} height={height} value={val / 2000 * 100} text='' cornerRadius="50%" innerRadius={rad} sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
            fill: color,
        },
        [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
        },
    })} />
}
export default MyGauge