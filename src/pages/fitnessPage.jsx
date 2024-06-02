import React from "react";
import { muscles } from "../feature/musclePartsSlice";
import { useSelector } from "react-redux";
import { Card, CardMedia, ListItem, List, CardContent, Typography } from "@mui/material";


const Fitness = () => {
    const muscleList = useSelector(muscles)

    return (<><List>
        {muscleList.map((item) => {
            return <ListItem key={item}>
                <Card sx={{ maxWidth: 200 }}>
                    <CardMedia component='img' image={`/muscles/${item}.png`} height='150' />
                    <CardContent><Typography gutterBottom variant="h5" component="div">{item}</Typography></CardContent>
                </Card></ListItem>
        })}
    </List></>)
}

export default Fitness