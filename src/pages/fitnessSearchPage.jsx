import { Card, CardMedia, ListItem, List, CardContent, Typography, AppBar, Select, InputLabel, MenuItem, FormControl, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDifficulty, fetchExerciseListStauts, fetchtype, setDifficulty, setmuscle, setType, updateExerciseList } from "../feature/muscleExercise";
import { fetchExerciseList } from "../feature/muscleExercise";
import { setPage } from "../feature/muscleExercise"
import { v4 as uuidv4 } from 'uuid';
const FitnessSearch = () => {
    const { excersie } = useParams()
    const dispatch = useDispatch()
    const excerList = useSelector(fetchExerciseList)
    const status = useSelector(fetchExerciseListStauts)
    const difficulty = useSelector(fetchDifficulty)
    const type = useSelector(fetchtype)
    const scrollhandler = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            dispatch(setPage())
            dispatch(updateExerciseList())
        }
    }
    const difficultyhandler = (e) => {
        dispatch(setDifficulty(e.target.value))
    }
    const typeHandler = (e) => {
        dispatch(setType(e.target.value))
    }
    const searchHandler = () => {
        dispatch(updateExerciseList())
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
        <AppBar position="fixed">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >difficulty</InputLabel>
                <Select value={difficulty} onChange={difficultyhandler}>
                    <MenuItem value={''}>all</MenuItem>
                    <MenuItem value={'beginner'}>beginner</MenuItem>
                    <MenuItem value={'intermediate'}>intermediate</MenuItem>
                    <MenuItem value={'expert'}>expert</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >type</InputLabel>
                <Select value={type} onChange={typeHandler}>
                    <MenuItem value={''}>all</MenuItem>
                    <MenuItem value={'cardio'}>cardio</MenuItem>
                    <MenuItem value={'olympic_weightlifting'}>olympic_weightlifting</MenuItem>
                    <MenuItem value={'plyometrics'}>plyometrics</MenuItem>
                    <MenuItem value={'powerlifting'}>powerlifting</MenuItem>
                    <MenuItem value={'strength'}>strength</MenuItem>
                    <MenuItem value={'stretching'}>stretching</MenuItem>
                    <MenuItem value={'strongman'}>strongman</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={searchHandler} color="inherit">search</Button>
        </AppBar>
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