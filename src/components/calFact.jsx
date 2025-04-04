import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoodName, getServing } from "../feature/foodDetailSlice";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { Round2D, percentile } from "./round2D";
import { addnuitri } from "../clientapi";
import { changeFoodModal } from "../feature/foodDetailSlice";
const deviderStyle = {
    border: '1px solid',
    borderColor: 'grey',
}
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const CalFact = ({ cur }) => {
    const dispath = useDispatch()
    const cal = useSelector((state) => {
        return getServing(state, cur)
    })
    const food = useSelector(getFoodName)
    const sum = Round2D((+cal.fat + (+cal.protein) + (+cal.carbohydrate)))
    const [amount, setamount] = useState('')
    const data1 = [
        { id: 0, value: cal.fat, label: `${percentile(+cal.fat, sum)}% fat: ${Round2D(cal.fat)} g`, color: '#5BD1D7' },
        { id: 1, value: cal.protein, label: `${percentile(+cal.protein, sum)}% protein: ${Round2D(cal.protein)} g`, color: '#F0BF4C' },
        { id: 2, value: cal.carbohydrate, label: `${percentile(+cal.carbohydrate, sum)}% carb: ${Round2D(cal.carbohydrate)} g`, color: '#F59794' },
    ]
    const data2 = [
        { value: Math.round(cal.calories), color: 'black' }
    ]
    const series = [
        {
            data: data1,
            innerRadius: 160,
            outerRadius: 180,
            cornerRadius: 14,
            paddingAngle: 2
        },
        {
            data: data2,
            innerRadius: 0,
            outerRadius: 140,
            arcLabel: (item) => `${item.value}Cals`,
        }
    ]
    const changeAmount = (e) => {
        setamount(e.target.value)
    }
    const submitHandler = async () => {
        const temp = { ...cal }
        const x = amount === '' ? 1 : amount
        for (const item in temp) {
            if (!Number.isNaN(temp[item])) {
                temp[item] = +temp[item] * x
            }
        }
        const {
            fat,
            saturated_fat,
            trans_fat,
            monounsaturated_fat,
            polyunsaturated_fat,
            protein,
            calories,
            carbohydrate,
            cholesterol,
            sodium,
            potassium,
            fiber, sugar,
            vitamin_a,
            vitamin_c,
            calcium,
            iron
        } = temp
        await addnuitri(fat,
            saturated_fat,
            trans_fat,
            monounsaturated_fat,
            polyunsaturated_fat,
            protein,
            calories,
            carbohydrate,
            cholesterol,
            sodium,
            potassium,
            fiber, sugar,
            vitamin_a,
            vitamin_c,
            calcium,
            iron, food)
        dispath(changeFoodModal())
    }
    if (cal === '') {
        return (<></>)
    }
    return <>
        <FormControl>
            <InputLabel>Amount</InputLabel>
            <Select label='Amount' value={amount} onChange={changeAmount}>
                {nums.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
        </FormControl>
        <Button variant="contained" onClick={submitHandler}>Submit</Button>
        <Box >
            <PieChart
                slotProps={{
                    legend: {
                        labelStyle: {
                            fontSize: 30,
                        }
                    }
                }}
                width={950}
                height={400}
                series={series}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: 'bold',
                        fontSize: 40,
                        whiteSpace: 'pre-line'
                    }
                }}
            /></Box>
        <Paper elevation={3} sx={{
            padding: '19px',
            width: 800,
            border: '2px solid grey',
            borderRadius: 0,
            height: 1000
        }}>
            <Stack direction='row' justifyContent="space-between">
                <Typography sx={{ fontSize: 44, fontWeight: 900 }}>
                    Nutrition Facts
                </Typography>

            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: '64px' }}
            >
                <Typography sx={{
                    lineHeight: '64px',
                    fontSize: 26, fontWeight: 900
                }}>
                    serving size
                </Typography>
                <Typography sx={{
                    lineHeight: '64px',
                    fontSize: 26, fontWeight: 900
                }}>
                    {`${cal.serving_description}`}
                </Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{
                    height: '90px'
                }}
            >
                <Stack>
                    <Typography sx={{
                        height: '22px',
                        lineHeight: '22px',
                        fontSize: 22,
                        fontWeight: 900
                    }}>Amount Per Serving
                    </Typography>
                    <Typography sx={{
                        height: '40px',
                        lineHeight: '40px',
                        fontSize: 38,
                        fontWeight: 900
                    }}>Calories
                    </Typography>
                </Stack>
                <Typography sx={{
                    lineHeight: '90px',
                    fontSize: 52,
                    fontWeight: 900
                }}>
                    {Math.round(cal.calories)}
                </Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Typography align="right"
                sx={{
                    height: '36px',
                    lineHeight: '36px',
                    fontSize: '22px',
                    fontWeight: 900
                }}
            >% Daily Values*</Typography>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22,
                        fontWeight: 900
                    }}>Total Fat</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.fat) + "g"}
                    </Typography>
                </Stack >
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}>{percentile(+cal.fat, 60)}%</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1} sx={
                    {
                        marginLeft: 1
                    }
                }>
                    <Typography sx={{
                        fontSize: 22
                    }}>Saturated Fat</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.saturated_fat) + 'g'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.saturated_fat, 22) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' spacing={1}
                sx={{ height: 38, lineHeight: 38, marginLeft: 1 }}>
                <Typography sx={{
                    fontSize: 22
                }}>Trans Fat</Typography>
                <Typography sx={{
                    fontSize: 22
                }}>
                    {Round2D(cal.trans_fat) + 'g'}
                </Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' spacing={1}
                sx={{ height: 38, lineHeight: 38, marginLeft: 1 }}>
                <Typography sx={{
                    fontSize: 22
                }}>Polyunsaturated Fat</Typography>
                <Typography sx={{
                    fontSize: 22
                }}>
                    {Round2D(cal.polyunsaturated_fat) + 'g'}
                </Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' spacing={1}
                sx={{ height: 38, lineHeight: 38, marginLeft: 1 }}>
                <Typography sx={{
                    fontSize: 22
                }}>Monounsaturated Fat</Typography>
                <Typography sx={{
                    fontSize: 22
                }}>
                    {Round2D(cal.monounsaturated_fat) + 'g'}
                </Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22,
                        fontWeight: 900
                    }}>Cholesterol</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.cholesterol) + "mg"}
                    </Typography>
                </Stack >
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}>{percentile(+cal.cholesterol, 300)}%</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22,
                        fontWeight: 900
                    }}>Sodium</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.sodium) + "mg"}
                    </Typography>
                </Stack >
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}>{percentile(+cal.sodium, 2000)}%</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22,
                        fontWeight: 900
                    }}>Total Carbohydrate</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.carbohydrate) + "mg"}
                    </Typography>
                </Stack >
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}>{percentile(+cal.carbohydrate, 2000)}%</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1} sx={
                    {
                        marginLeft: 1
                    }
                }>
                    <Typography sx={{
                        fontSize: 22
                    }}>Dietary Fiber</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.fiber) + 'g'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.fiber, 28) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' spacing={1}
                sx={{ height: 38, lineHeight: 38, marginLeft: 1 }}>
                <Typography sx={{
                    fontSize: 22
                }}>Sugars</Typography>
                <Typography sx={{
                    fontSize: 22
                }}>
                    {Round2D(cal.sugar) + 'g'}
                </Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' spacing={1} sx={{ height: 38, lineHeight: 38 }}>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}>Protein</Typography>
                <Typography sx={{
                    fontSize: 22
                }}>
                    {Round2D(cal.protein) + "g"}
                </Typography>
            </Stack >
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22
                    }}>Vitamin D</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.vitamin_d) + 'mg'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.vitamin_d, 20) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22
                    }}>Calcium</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.calcium) + 'mg'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.calcium, 1000) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22
                    }}>Iron</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.iron) + 'mg'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.iron, 8) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22
                    }}>Potassium</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.potassium) + 'mg'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.potassium, 3400) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22
                    }}>Vitamin A</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.vitamin_a) + 'mg'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.vitamin_a, 900) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Stack direction='row' justifyContent="space-between"
                sx={{ height: 38, lineHeight: 38 }}>
                <Stack direction='row' spacing={1}>
                    <Typography sx={{
                        fontSize: 22
                    }}>Vitamin C</Typography>
                    <Typography sx={{
                        fontSize: 22
                    }}>
                        {Round2D(cal.vitamin_c) + 'mg'}
                    </Typography>
                </Stack>
                <Typography sx={{
                    fontSize: 22,
                    fontWeight: 900
                }}> {percentile(cal.vitamin_c, 1000) + '%'}</Typography>
            </Stack>
            <Divider sx={deviderStyle} />
            <Typography
                sx={{
                    fontSize: 18
                }}
            >* The % Daily Value (DV) tells you how much a nutrient in a serving of
                food contributes to a daily diet. 2,000 calories a day is used
                for general nutrition advice.</Typography>
        </Paper>

    </>
}

export default CalFact