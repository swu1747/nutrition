import { Card, CardMedia, ListItem, List, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateExerciseList } from "../feature/muscleExercise";
import { fetchExerciseList } from "../feature/muscleExercise";
const FitnessSearch = () => {
    const { excersie } = useParams()
    const dispatch = useDispatch()
    const excerList = useSelector(fetchExerciseList)
    useEffect(() => {
        dispatch(updateExerciseList({ muscle: excersie }))
    })
    return (<List>
        {excerList.map((excer) => {
            return <ListItem key={excer.name}>
                <Card sx={{ Width: 100, Height: 100 }}>
                    <CardMedia objectFit="contain" component='img' image={`/type/${excer.type}.png`} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">name:{excer.name}</Typography>
                        <Typography gutterBottom variant="h5" component="div"> difficulty: {excer.difficulty}</Typography>
                    </CardContent>
                </Card>
            </ListItem>
        })}
    </List>)
}
export default FitnessSearch