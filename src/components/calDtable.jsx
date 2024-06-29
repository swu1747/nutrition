import React from "react";
import { Table, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, } from "@mui/material";
import dayjs from "dayjs";
import { uniqueId } from "lodash";
const CalDtable = ({ detail }) => {
    const rows = detail.map((item) => {
        const exercise = item.exercise
        const start = dayjs(item.starttime)
        const end = dayjs(item.endtime)
        const cal = end.diff(start, 'minute') * (+item.calpermin)
        return { exercise, starttime: start.format('HH:mm'), endtime: end.format('HH:mm'), cal }
    })
    return <TableContainer component={Paper} sx={{ width: 470 }}>
        <Table sx={{ maxWidth: '100%' }} >
            <TableHead>
                <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Total Cal Burn</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => {
                    return <TableRow
                        key={uniqueId()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.exercise}
                        </TableCell>
                        <TableCell align="right">{row.starttime}</TableCell>
                        <TableCell align="right">{row.endtime}</TableCell>
                        <TableCell align="right">{row.cal}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </TableContainer>
}

export default CalDtable