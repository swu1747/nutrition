import React from "react";
import { Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeFoodModal, getFoodModal } from '../feature/foodDetailSlice'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '150%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const FoodModal = () => {
    const modal = useSelector(getFoodModal)
    const dispatch = useDispatch()
    const modalChange = () => {
        dispatch(changeFoodModal())
    }

    return (
        <Modal style={style}
            open={modal}
            onClose={modalChange}>
            <Typography>success</Typography>
        </Modal>
    )
}
export default FoodModal