import { Modal, Typography,Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getModal } from "../feature/calburnslice";
import { changeModal } from "../feature/calburnslice";
import React from "react";
const BurnCalModal = () => {

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

    const show = useSelector(getModal)
    const dispath = useDispatch()
    const modalcontrol = () => {
        dispath(changeModal())
    }

    return (<Modal
        open={show}
        onClose={modalcontrol}
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                success
            </Typography>
        </Box>
    </Modal>)
}


export default BurnCalModal