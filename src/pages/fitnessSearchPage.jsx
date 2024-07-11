import { CircularProgress, Card, CardMedia, ListItem, List, CardContent, Typography, AppBar, Select, InputLabel, MenuItem, FormControl, Button, Link, Box, Rating, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fetchDifficulty, fetchExerciseListStauts, fetchtype, setDifficulty, setmuscle, setType, updateExerciseList } from "../feature/muscleExercise";
import { fetchExerciseList } from "../feature/muscleExercise";
import { setPage } from "../feature/muscleExercise"
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@mui/system';
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";

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
            window.removeEventListener('scroll', scrollhandler)
        }
    }, [])
    return (<>
        <TopNavi display={'Fitness Center'} />
        <Stack>        <AppBar position="static">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel  >difficulty</InputLabel>
                <Select value={difficulty} onChange={difficultyhandler}>
                    <MenuItem value={''}>all</MenuItem>
                    <MenuItem value={'beginner'}>beginner</MenuItem>
                    <MenuItem value={'intermediate'}>intermediate</MenuItem>
                    <MenuItem value={'expert'}>expert</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, fontSize: 30 }}>
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
            <Button variant="contained" onClick={searchHandler}>Search</Button>
        </AppBar>
            {status === 'pending' ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress color="primary" size={80} thickness={5} />
            </Box> : <List sx={{ height: 1300, overflow: 'auto' }}>
                {excerList.map((excer) => {
                    let value = 5
                    if (excer.difficulty == 'beginner') {
                        value = 1
                    } else {
                        value = 3
                    }
                    return <ListItem key={uuidv4()}>
                        <Link component={RouterLink} underline='none' to={`/fitness/${excersie}/${excer.name}`}>
                            <Card sx={{ height: 350, width: 900, display: 'flex' }}>
                                <CardMedia sx={{ height: 300, width: 300 }} component='img' image={`/type/${excer.type}.png`} />
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                                    <Typography gutterBottom variant="h3" component="div">{excer.name}</Typography>
                                    <Box>
                                        <Typography gutterBottom variant="h4" component="div"> difficulty</Typography>
                                        <Rating readOnly size='large' value={value} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Link>
                    </ListItem>
                })}
            </List>}
        </Stack>
        <Navi n={2} />
    </>)
}
export default FitnessSearch