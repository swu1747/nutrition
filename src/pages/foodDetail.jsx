import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNutri, getFood, getFoodName, getServing } from "../feature/foodDetailSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CalFact from "../components/calFact.jsx";
import FoodModal from "../components/FoodModal.jsx";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";

const FoodDetail = () => {

    const param = useParams()
    const food_id = param.food_id
    const dispath = useDispatch()
    const nutriList = useSelector(getFood)
    const food_name = useSelector(getFoodName)
    const [serving, setServing] = useState('')
    const servingHandler = (e) => {
        setServing(e.target.value)
    }
    useEffect(() => {
        dispath(fetchNutri(food_id))
    }, [])
    return <>
    <TopNavi display={food_name}/>
        <FormControl fullWidth >
            <InputLabel >serving size</InputLabel>
            <Select value={serving} onChange={servingHandler}>
                {nutriList.map((item) => <MenuItem value={item.serving_description} key={item.serving_id}>{item.serving_description}</MenuItem>)}
            </Select>
        </FormControl>
        <CalFact cur={serving} />
        <FoodModal />
        <Navi n={1} />
    </>
}

export default FoodDetail