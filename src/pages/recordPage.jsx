import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navi from "../components/Navi.jsx";

const RecordPage = () => {
    const navigate = useNavigate()
    return <Stack>
        <Card onClick={() => {
            navigate('/calburn')
        }}>
            <CardContent>
                <Typography>cal burn</Typography>
            </CardContent>
        </Card>
        <Card onClick={() => {
            navigate('/eatfood')
        }}>
            <CardContent>
                <Typography>eatfood</Typography>
            </CardContent>
        </Card>
        <Navi n={1} />
    </Stack>



}

export default RecordPage