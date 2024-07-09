import React from "react";
import { muscles } from "../feature/musclePartsSlice";
import { useSelector } from "react-redux";
import { Card, CardMedia, ListItem, List, CardContent, Typography, Stack, Grid } from "@mui/material";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";


const Fitness = () => {
    const muscleList = useSelector(muscles)

    return (<>
        <TopNavi display={'Fitness Center'} />
        <Grid container spacing={10} sx={{ flexGrow: 1, margin: '0 auto', width: 799, marginTop: 10, justifyContent: 'space-between', height: 1400, overflow: 'auto' }} >
            {muscleList.map((item) => {
                return (<Card key={item} sx={{ maxWidth: 200, maxHeight: 300, marginBottom: 10 }}>
                    <Link component={RouterLink} underline="none" to={`/fitness/${item}`} replace={true}>
                        <CardMedia component='img' image={`/muscles/${item}.png`} height='200' />
                        <CardContent><Typography gutterBottom variant="h4" component="div" align="center">{item}</Typography></CardContent>
                    </Link>
                </Card>)

            })}
        </Grid>
        <Navi n={2} /></>)
}

export default Fitness