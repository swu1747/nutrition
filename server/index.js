const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { admin } = require('./firebase/firebaseAdmin')
const api = require('./ninjaApi/ninjaApi')

const getExercise = api.getExercise
const getCalBurn = api.getCalBurn


const app = express()
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

app.listen(4567, () => {
    console.log('server on 4567')
})