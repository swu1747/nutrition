const axios = require('axios')

const apiRequest = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1',
    headers: {
        'X-Api-Key': 'l6cVuQ9jaN+fT4ITvqk3FQ==QUfPKqj6mac5bVSB'
    }
})

module.exports.apiRequest = apiRequest 