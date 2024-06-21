import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Button, Card, CardActions, CardContent, CardHeader, Collapse, TextField, Typography } from "@mui/material";
import { getCalBurn } from "../clientapi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchItem, getSearchRes, fetchSearchRes, fetchStatus, changeExpand } from '../feature/calburnslice'
import { List, ListItem } from "@mui/material";
import debounce from "../components/debounce";
import TimeSetter from "../components/timesetter.jsx";
const CalBurn = () => {
    const dispath = useDispatch()
    const resStatus = useSelector(fetchStatus)
    const res = useSelector(getSearchRes)
    const [searchRes, setSearchRes] = useState([])
    const inputhandler = async (e) => {
        try {
            const temp = e.target.innerHTML || e.target.value
            dispath((setSearchItem(temp)))
            if (temp !== '') {
                const res = await getCalBurn({ activity: e.target.value })
                setSearchRes(res.data)
            }
        } catch (error) {
            throw error
        }
    }
    const handler = debounce(inputhandler)
    const searchres = () => {
        dispath(fetchSearchRes())
    }
    const expandHandler = (e) => {
        dispath(changeExpand(e.target.value))
    }
    return <>
        <Autocomplete
            freeSolo
            options={searchRes.map((item) => item.name)}
            renderInput={(params) => {
                return <TextField {...params}
                    label='search'
                />
            }}
            label='search'
            onInputChange={handler}
        />
        <Button onClick={searchres}>search</Button>
        {resStatus === 'idle' ? <div></div> : <List>
            {res.map((item) => <ListItem key={item.name}>
                <Card >
                    <CardContent>
                        <Typography>{item.name}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>{item.calories_per_hour}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button value={item.name} onClick={expandHandler}>select</Button>
                    </CardActions>
                    <Collapse in={item.expand} unmountOnExit><TimeSetter exercise={item.name} value={item.calories_per_hour} /></Collapse>
                </Card>
            </ListItem>)}
        </List>}
    </>
}
export default CalBurn

