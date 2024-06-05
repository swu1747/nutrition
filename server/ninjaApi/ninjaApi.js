const apiRequest = require('./axiosConfig').apiRequest


const getExercise = async ({ type, muscle, difficulty, offset }) => {
    try {
        return apiRequest.get('/exercises', { params: { type, muscle, difficulty, offset } })
    } catch (err) {
        console.log(err)
    }
}

const getCalBurn = async ({ activity }) => {
    try {
        return apiRequest.get('/caloriesburned', { params: { activity } })
    } catch (error) {
        throw error
    }
}

module.exports.getExercise = getExercise
module.exports.getCalBurn = getCalBurn