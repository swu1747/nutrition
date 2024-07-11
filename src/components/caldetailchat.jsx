import React from "react";
import { BarChart } from "@mui/x-charts";

const CalDChart = ({ cal }) => {

    return (<BarChart yAxis={[{
        tickFontSize: 20
    }]}
        series={[{ data: cal, label: 'Calorie Burn Rate(Cal/h)', color: '#DE3163' }]}
        height={500} width={950} borderRadius={15} grid={{ horizontal: true }} />)

}

export default CalDChart