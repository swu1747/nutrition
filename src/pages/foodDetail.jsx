import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNutri1, getFood, getFoodName } from "../feature/foodDetailSlice";

const FoodDetail = () => {
    const param = useParams()
    const food_id = param.food_id
    const dispath = useDispatch()
    const nutriList = useSelector(getFood)
    const food_name = useSelector(getFoodName)
    useEffect(() => {
        dispath(fetchNutri1(food_id))
    }, [])
    return <>sdfs
        {food_name}
    </>
}

export default FoodDetail