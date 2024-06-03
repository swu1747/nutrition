const axios = require('axios')

const apiRequest = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1',
    headers: {
        'X-Api-Key': 'Lyu85tNSW/enmQW6lw+xYA==iWuK0Y59ZSMNFpos'
    }
})

module.exports.apiRequest = apiRequest 