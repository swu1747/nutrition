import axios from "axios";
const apiRequest = axios.create({
    baseURL: 'http://localhost:4567'
})
export const getExercise = async ({ type, muscle, difficulty, offset }) => {
    try {
        return apiRequest.get('/exercise', {
            params: { type, muscle, difficulty, offset }
        })
    } catch (error) {
        throw error
    }
}

export const getCalBurn = async ({ activity }) => {
    try {
        return apiRequest.get('/caloriesburned', {
            params: { activity }
        })
    } catch (error) {
        throw error
    }
}

export const nuitrisearch = async ({ search_expression }) => {
    try {
        return apiRequest('/nuitrisearch', {
            params: { search_expression }
        })
    } catch (error) {
        throw error
    }
}

export const getNuitrition = async ({ food_id }) => {
    try {
        return apiRequest('/nuitrition', {
            params: { food_id }
        })
    } catch (error) {
        throw error
    }
}

