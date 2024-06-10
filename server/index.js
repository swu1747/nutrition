const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { admin } = require('./firebase/firebaseAdmin')
const api = require('./ninjaApi/ninjaApi')
const { default: axios } = require('axios')
const nuitritionApi = require('./fatscretApi/nuitritionApi').nuitritionApi
const getExercise = api.getExercise
const getCalBurn = api.getCalBurn
// const getNuitrition = api.getNuitrition


const app = express()
let access_token
let nuitruiApi
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use((req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        res.redirect('/')
    } else {
        admin.auth().verifyIdToken(token).then((message) => {
            next()
        }).catch(() => {
            res.redirect('/')
        })
    }
})
app.get('/exercise', async (req, res, next) => {
    try {
        const response = await getExercise(req.query)
        res.send(response.data)
    } catch (error) {
        throw error
    }
})
app.get('/caloriesburned', async (req, res, next) => {
    try {
        const response = await getCalBurn(req.query)
        res.send(response.data)
    } catch (error) {
        throw error
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
        console.log('res', response.food)
        res.send(response.food)
    } catch (error) {
        throw error
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
        // console.log('>>>',req.query.search_expression)
        // console.log('???', response.data.foods.food)
        res.send(response.data.foods.food)
    } catch (error) {
        throw error
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