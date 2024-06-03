import { Card, CardMedia, ListItem, List, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchExerciseListStauts, setmuscle, updateExerciseList } from "../feature/muscleExercise";
import { fetchExerciseList } from "../feature/muscleExercise";
import { setPage } from "../feature/muscleExercise";
import { v4 as uuidv4 } from 'uuid';
const FitnessSearch = () => {
    const { excersie } = useParams()
    const dispatch = useDispatch()
    const excerList = useSelector(fetchExerciseList)
    const status = useSelector(fetchExerciseListStauts)

    const scrollhandler = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            dispatch(setPage())
            dispatch(updateExerciseList())
        }
    }

    useEffect(() => {
        dispatch(setmuscle(excersie))
        dispatch(updateExerciseList())
        window.addEventListener('scroll', scrollhandler)
        return () => {
            window.addEventListener('scroll', scrollhandler)
        }
    }, [])
    return (<>
        <List>
            {excerList.map((excer) => {
                return <ListItem key={uuidv4()}>
                    <Card sx={{ Width: 100, Height: 100 }}>
                        <CardMedia component='img' image={`/type/${excer.type}.png`} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">name:{excer.name}</Typography>
                            <Typography gutterBottom variant="h5" component="div"> difficulty: {excer.difficulty}</Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            })}
        </List>
        {status === 'pending' ? <div>loading...</div> : <></>}
    </>)
}
export default FitnessSearch