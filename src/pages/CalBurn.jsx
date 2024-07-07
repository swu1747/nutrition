import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, TextField, Typography } from "@mui/material";
import { getCalBurn } from "../clientapi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchItem, getSearchRes, fetchSearchRes, fetchStatus, changeExpand } from '../feature/calburnslice'
import { List, ListItem } from "@mui/material";
import debounce from "../components/debounce";
import TimeSetter from "../components/timesetter.jsx";
import BurnCalModal from "../components/modal.jsx";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";
import SearchIcon from '@mui/icons-material/Search'
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
        <TopNavi display={'Record Exercise'} />
        <Box display='flex' marginLeft='30px' marginTop='40px' flexDirection={'column'}>
            <Box display='flex'>
                <Autocomplete
                    freeSolo
                    ListboxProps={{
                        style: {
                            fontSize: 30,  // Adjust font size here
                        }
                    }}
                    options={searchRes.map((item) => item.name)}
                    renderInput={(params) => {
                        return <TextField {...params}
                            sx={{
                                '.MuiInputLabel-root': {
                                    fontSize: 30,  // Adjust label font size here
                                },
                                '.MuiInputBase-root': {
                                    height: 100,
                                    fontSize: 30  // Adjust height here
                                },
                                width: '800px'
                            }}
                            label='Calories Burn'
                        />
                    }}
                    label='search'
                    onInputChange={handler}
                />
                <Button variant="contained" onClick={searchres}><SearchIcon sx={{ width: 60 }} /></Button>
            </Box>
            {resStatus === 'idle' ? null : <List sx={{ height: 1400, overflow: 'auto',marginLeft:-2 }}>
                {res.map((item) => <ListItem key={item.name}>
                    <Card sx={{
                        width: 900
                    }} >
                        <CardContent>
                            <Typography variant="h3" color={'#6F6F6F'}>{item.name}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="h4" color={'#6F6F6F'}>Cal: {item.calories_per_hour} Cal/h</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" value={item.name} onClick={expandHandler} sx={{ fontSize: 30, width: '100%' }}>Select</Button>
                        </CardActions>
                        <Collapse in={item.expand} unmountOnExit><TimeSetter exercise={item.name} value={item.calories_per_hour} /></Collapse>
                    </Card>
                </ListItem>)}
            </List>}
            <BurnCalModal />
        </Box>
        <Navi n={1} />
    </>
}
export default CalBurn

