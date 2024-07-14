import React, { useEffect, useState } from "react";
import { Autocomplete, Button, CardContent, TextField, Typography, Card, Stack, Box } from "@mui/material";
import { nuitrisearch } from "../clientapi";
import { getStatus, getfood, getsearchRes, setStatus, setFood, fetchNuitriList } from "../feature/nuitriSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";
import debounce from "../components/debounce";
import SearchIcon from '@mui/icons-material/Search'
import { Link } from "@mui/material";

const EatFood = () => {
    const dispath = useDispatch()
    const [search, setSearch] = useState([])
    const status = useSelector(getStatus)
    const nuitrilist = useSelector(getsearchRes)
    useEffect(() => {
        dispath(setStatus('idle'))
    },[])
    const inputhandler = async (e) => {
        dispath(setStatus('idle'))
        try {
            const temp = e.target.innerHTML || e.target.value
            dispath(setFood(temp))
            if (temp !== '') {
                const res = await nuitrisearch({ search_expression: temp })
                if (Array.isArray(res.data)) {
                    setSearch(res.data)
                } else {
                    setSearch([])
                }
            } else {
                setSearch([])
            }
        } catch (error) {
            throw error
        }
    }
    const handler = debounce(inputhandler)
    const searchNuitri = () => {
        dispath(fetchNuitriList())
    }
    return <>
        <TopNavi display={'Record Nutrition Intake'} />
        <Box display='flex' marginLeft='30px' marginTop='40px' flexDirection={'column'}>
            <Box display='flex'>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={search}
                    ListboxProps={{
                        style: {
                            fontSize: 30,  // Adjust font size here
                        }
                    }}
                    getOptionLabel={
                        (option) => {
                            return option.food_name
                        }
                    }
                    renderInput={
                        (params) => {
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
                                label='Nutrition Intake'
                            />
                        }
                    }
                    renderOption={
                        (props, option) => {
                            return <li {...props}
                                key={option.food_id}
                            >
                                {option.food_name}
                            </li>
                        }
                    }
                    onInputChange={handler} />
                <Button variant="contained" onClick={searchNuitri}><SearchIcon sx={{ width: 60 }} /></Button>
            </Box>

        </Box>
        {status === 'idle' ? null : <Stack sx={{ marginLeft: 3, height: 1350, overflow: 'auto' }} >{
            nuitrilist.map((food) => {
                return <Link component={RouterLink} underline="none" key={food.food_id} to={`/eatfood/${food.food_id}`} ><Card sx={{ width: 900 }}  >
                    <CardContent><Typography variant="h4">{food.food_name}</Typography></CardContent>
                    <CardContent><Typography variant="h5" >{food.food_description}</Typography></CardContent>
                </Card></Link>
            })}
        </Stack>}
        <Navi n={1} />
    </>
}

export default EatFood