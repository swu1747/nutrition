import React, { useState } from "react";
import { Autocomplete, Button, CardContent, TextField, Typography, Card, List } from "@mui/material";
import { nuitrisearch } from "../clientapi";
import { getStatus, getfood, getsearchRes, setStatus, setFood, fetchNuitriList } from "../feature/nuitriSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";
import debounce from "../components/debounce";
const EatFood = () => {
    const dispath = useDispatch()
    const [search, setSearch] = useState([])
    const status = useSelector(getStatus)
    const nuitrilist = useSelector(getsearchRes)
    const inputhandler = async (e) => {
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
            <TopNavi display={'Record'}/>
        <Autocomplete
            freeSolo
            disableClearable
            options={search}
            getOptionLabel={
                (option) => {
                    return option.food_name
                }
            }
            renderInput={
                (params) => {
                    return <TextField {...params}
                        label='search'
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
        <Button onClick={searchNuitri}>search</Button>
        {status === 'idle' ? <div></div> : <List>{
            nuitrilist.map((food) => {
                return <Link key={food.food_id} to={`/eatfood/${food.food_id}`}><Card  >
                    <CardContent><Typography>{food.food_name}</Typography></CardContent>
                    <CardContent><Typography>{food.food_description}</Typography></CardContent>
                </Card></Link>
            })}
        </List>}
        <Navi n={1} />
    </>
}

export default EatFood