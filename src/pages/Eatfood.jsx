import React, { useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { nuitrisearch } from "../clientapi";

const EatFood = () => {
    const [search, setSearch] = useState([])
    const [food, setfood] = useState('')
    const inputhandler = async (e) => {
        try {
            const temp = e.target.innerHTML || e.target.value
            if (temp !== '') {
                const res = await nuitrisearch({ search_expression: temp })
                if (Array.isArray(res.data)) {
                    console.log(res.data)
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
    const searchNuitri = async () => {
        try {
            const res = await nuitrisearch({ search_expression: search })
            console.log(res)
        } catch (error) {
            throw error
        }
    }
    return <>
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
                        label='searcsh'
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
            onInputChange={inputhandler} />
        <Button onClick={searchNuitri}>search</Button>
    </>
}

export default EatFood