import React from "react";
import { Modal, Typography,Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeFoodModal, getFoodModal } from '../feature/foodDetailSlice'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 0,
    p: 4,
};
const FoodModal = () => {
    const modal = useSelector(getFoodModal)
    const dispatch = useDispatch()
    const modalChange = () => {
        dispatch(changeFoodModal())
    }

    return (
        <Modal
            open={modal}
            onClose={modalChange}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    success
                </Typography>
            </Box>
        </Modal>
    )
}
export default FoodModal