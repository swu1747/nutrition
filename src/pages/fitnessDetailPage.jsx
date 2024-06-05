import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchExercise } from "../feature/muscleExercise";

const ExcerciseDetail = () => {
    const param = useParams()
    const excersie = param.name
    const detail = useSelector((state) => {
        return fetchExercise(state, excersie)
    })
    return (<Card>
        <CardContent>
            <Typography>{detail.name}</Typography>
        </CardContent>
        <CardContent>
            <Typography>{detail.type}</Typography>
        </CardContent>
        <CardContent>
            <Typography>{detail.difficulty}</Typography>
        </CardContent>
        <CardContent>
            <Typography>{detail.equipment}</Typography>
        </CardContent>
        <CardContent>
            <Typography>{detail.instructions}</Typography>
        </CardContent>
    </Card>)
}
export default ExcerciseDetail