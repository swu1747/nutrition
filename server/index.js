const express = require('express')
const path = require('path')
const app = express()
const { admin } = require('./firebase/firebaseAdmin')
app.use(express.static(path.join(__dirname, '../dist')))
app.use((req, res, next) => {
    const token = req.headers.token
    console.log('>>>',token)
    if (!token) {
        console.log('notoken')
        res.redirect('/')
    } else {
        admin.auth().verifyIdToken(token).then((message) => {
            console.log('success', message)
            next()
        }).catch(() => {
            console.log('bad token', token)
            res.redirect('/')
        })
    }
})
app.get('/eat', (req, res, next) => {
    console.log('someone eat banana')
    res.send('banana')
})

app.listen(4567, () => {
    console.log('server on 4567')
})