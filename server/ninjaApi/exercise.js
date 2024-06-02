const apiRequest = require('./axiosConfig').apiRequest


const getExercise = async ({ type, muscle, difficulty, offset }) => {
    try {
        return apiRequest.get('/exercises', { params: { type, muscle, difficulty, offset } })
    } catch (err) {
        console.log(err)
    }
}

module.exports.getExercise = getExercise