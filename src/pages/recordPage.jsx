import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

const RecordPage = () => {
    return <div>
        <Link to={'/calburn'}>
            <Card>
                <CardContent>
                    <Typography>cal burn</Typography>
                </CardContent>
            </Card>
        </Link>
        <Link to={'/eatfood'}>
            <Card>
                <CardContent>
                    <Typography>eatfood</Typography>
                </CardContent>
            </Card>
        </Link>
    </div>
}

export default RecordPage