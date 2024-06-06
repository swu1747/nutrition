const axios = require('axios')

const nuitritionApi = (token) => {
    return axios.create({
        baseURL: 'https://platform.fatsecret.com/rest/server.api',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}
module.exports.nuitritionApi = nuitritionApi