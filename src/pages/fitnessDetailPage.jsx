import { Card, CardContent, Rating, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchExercise } from "../feature/muscleExercise";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";


const ExcerciseDetail = () => {
    const param = useParams()
    const excersie = param.name
    const detail = useSelector((state) => {
        return fetchExercise(state, excersie)
    })
    let value = 5
    if (detail.difficulty === 'beginner') {
        value = 1
    } else {
        value = 3
    }
    return (<>
        <TopNavi display={'Fitness Center'} />
        <Card sx={{ height: 1550, overflow: 'auto' }}>
            <CardContent>
                <Typography variant="h2" fontWeight={40}>{detail.name}</Typography>
            </CardContent>
            <CardContent>
                <Typography variant="h4">type: {detail.type}</Typography>
            </CardContent>
            <CardContent>
                <Typography variant="h4">difficulty:</Typography>
                <Rating readOnly value={value} size='large' />
            </CardContent>
            <CardContent>
                <Typography variant="h4">required equipment: {detail.equipment}</Typography>
            </CardContent>
            <CardContent>
                <Typography variant="h6">{detail.instructions}</Typography>
            </CardContent>
        </Card>
        <Navi n={2} />
    </>)
}
export default ExcerciseDetail