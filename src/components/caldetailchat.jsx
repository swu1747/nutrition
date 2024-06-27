import React from "react";
import { BarChart } from "@mui/x-charts";

const CalDChart = ({ cal }) => {

    return (<BarChart
        series={[{ data: cal, label: 'Calorie Burn Rate(Cal/h)', color: '#DE3163' }]}
        height={300} width={500} borderRadius={5} grid={{ horizontal: true }} />)

}

export default CalDChart