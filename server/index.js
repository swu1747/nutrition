const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { admin } = require('./firebase/firebaseAdmin')
const api = require('./ninjaApi/ninjaApi')
const { default: axios } = require('axios')
const nuitritionApi = require('./fatscretApi/nuitritionApi').nuitritionApi
const dayjs = require('dayjs')
const getExercise = api.getExercise
const getCalBurn = api.getCalBurn
const { addCalBurn,
    fetchCalBydate,
    addCalPerDay,
    fetchSingleDayTotalCal,
    fetchRangeDayTotalCal,
    incrementSingleDayCal,
    addNuitri,
    findNutriSingleDay,
    findNutriRangedDay } = require('../database/createTable')
// const getNuitrition = api.getNuitrition


const app = express()
let access_token
let nuitruiApi
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.json())
app.use((req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        res.redirect('/')
    } else {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            req.uid = decodedToken.uid
            next()
        }).catch(() => {
            res.redirect('/')
        })
    }
})

app.post('/addnuitri', async (req, res) => {
    const { fat, saturated_fat, trans_fat, monounsaturated_fat, polyunsaturated_fat, protein, calories, carbohydrate, cholesterol, sodium, potassium, fiber, sugar, vitamin_a, vitamin_c, calcium, iron, food
    } = req.body
    try {
        const response = addNuitri(req.uid, fat, saturated_fat, trans_fat, monounsaturated_fat, polyunsaturated_fat, protein, calories, carbohydrate, cholesterol, sodium, potassium, fiber, sugar, vitamin_a, vitamin_c, calcium, iron, food)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})
app.get('/getsdnuitri', async (req, res) => {
    try {
        const { date } = req.query
        const response = findNutriSingleDay(req.uid, date)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})
app.get('/getrangedaynuitri', async (req, res) => {
    try {
        const { startdate, enddate } = req.query
        const response = findNutriRangedDay(req.uid, startdate, enddate)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})
app.post('/addcalburn', async (req, res, next) => {
    try {
        const { exercise, starttime, endtime, calpermin, totalCal } = req.body
        const today = dayjs(starttime).format('YYYY-MM-DD')
        const userid = req.uid
        await addCalBurn(exercise, userid, starttime, endtime, calpermin)
        const daycal = await fetchSingleDayTotalCal(userid, today)
        if (daycal.length === 0) {
            await addCalPerDay(userid, totalCal)
        } else {
            await incrementSingleDayCal(userid, today, totalCal)
        }
        res.send('success')
    } catch (error) {
        console.log(error)
    }
})

app.get('/singledaycal', async (req, res, next) => {
    try {
        const date = req.query.date
        const response = await fetchSingleDayTotalCal(req.uid, date)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})
app.get('/singledaycaldetail', async (req, res) => {
    try {
        const date = req.query.date
        const response = await fetchCalBydate(date, req.uid)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})
app.get('/rangeddayscal', async (req, res, next) => {
    const { startdate, enddate } = req.query
    const response = await fetchRangeDayTotalCal(req.uid, startdate, enddate)
    res.send(response)
})
app.get('/exercise', async (req, res, next) => {
    try {
        const response = await getExercise(req.query)
        res.send(response.data)
    } catch (error) {
        console.log(error)
    }
})
app.get('/caloriesburned', async (req, res, next) => {
    try {
        const response = await getCalBurn(req.query)
        res.send(response.data)
    } catch (error) {
        console.log(error)
    }
})
app.get('/nuitrition', async (req, res, next) => {
    try {
        const response = await nuitruiApi.get('', {
            params: {
                food_id: req.query.food_id,
                format: 'json',
                method: 'food.get.v4'
            }
        })
        res.send(response.data.food)
    } catch (error) {
        console.log(error)
    }
})
app.get('/nuitrisearch', async (req, res, next) => {
    try {
        const response = await nuitruiApi.get('', {
            params: {
                search_expression: req.query.search_expression,
                format: 'json',
                method: 'foods.search'
            }
        })
        res.send(response.data.foods.food)
    } catch (error) {
        console.log(error)
    }
})

app.listen(4567, () => {
    const clientID = 'a3d6585ebc744a918246a9dca16568bd'
    const clientSecret = 'd79fb7e570c24e7f979bcfe91fd9d40c'
    const option = {
        method: 'POST',
        url: 'https://oauth.fatsecret.com/connect/token',
        auth: {
            username: clientID,
            password: clientSecret
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
            grant_type: 'client_credentials',
            scope: 'basic'
        }
    }
    axios(option).then((res) => {
        access_token = res.data.access_token
        nuitruiApi = nuitritionApi(access_token)
        console.log('server on 4567')
    })
})