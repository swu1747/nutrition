import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navi from "../components/Navi.jsx";
import TopNavi from "../components/TopNavi.jsx";

const RecordPage = () => {
    const navigate = useNavigate()
    return <Stack>
        <TopNavi display={'Record Center'} />
        <Card sx={{ height: 400, display: 'flex', justifyContent: 'center', flexDirection: 'column' }} onClick={() => {
            navigate('/calburn')
        }}>
            <CardContent >
                <Typography variant='h1' textAlign={'center'} color='#DE3163' fontWeight={30}>Calories Burn</Typography>
            </CardContent>
        </Card>
        <Card sx={{ height: 400, display: 'flex', justifyContent: 'center', flexDirection: 'column' }} onClick={() => {
            navigate('/eatfood')
        }}>
            <CardContent >
                <Typography variant='h1' textAlign={'center'} color='#50C878' fontWeight={30}>Calories Intake</Typography>
            </CardContent>
        </Card>
        <Navi n={1} />
    </Stack>



}

export default RecordPage