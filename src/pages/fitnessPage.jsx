import React from "react";
import { muscles } from "../feature/musclePartsSlice";
import { useSelector } from "react-redux";
import { Card, CardMedia, ListItem, List, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Navi from "../components/Navi.jsx";


const Fitness = () => {
    const muscleList = useSelector(muscles)

    return (<><List>
        {muscleList.map((item) => {
            return <ListItem key={item}>
                <Card sx={{ maxWidth: 200, maxHeight: 200 }}>
                    <Link to={`/fitness/${item}`} replace={true}><CardMedia component='img' image={`/muscles/${item}.png`} height='150' />
                        <CardContent><Typography gutterBottom variant="h5" component="div">{item}</Typography></CardContent>
                    </Link>
                </Card></ListItem>
        })}
    </List>
    <Navi n={2} /></>)
}

export default Fitness