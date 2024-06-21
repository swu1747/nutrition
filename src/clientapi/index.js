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

export const addcalburn = async (exercise, starttime, endtime, calpermin, totalCal) => {
    try {
        return apiRequest.post('/addcalburn', {
            exercise, starttime, endtime, calpermin, totalCal
        })
    } catch (error) {
        throw (error)
    }
}

export const getsingledaycal = async (date) => {
    try {
        return apiRequest.get('/singledaycal', {
            params: { date }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getsingledaycaldetail = async (date) => {
    try {
        return apiRequest.get('/singledaycaldetail', {
            params: { date }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getrangeddayscal = async (startdate, enddate) => {
    try {
        return apiRequest.get('/rangeddayscal', {
            params: { startdate, enddate }
        })
    } catch (error) {
        console.log(error)
    }
}

export const addnuitri = async (fat, saturated_fat, trans_fat, monounsaturated_fat, polyunsaturated_fat, protein, calories, carbohydrate, cholesterol, sodium, potassium, fiber, sugar, vitamin_a, vitamin_c, calcium, iron, food) => {
    try {
        return apiRequest.post('/addnuitri', {
            fat,
            saturated_fat,
            trans_fat,
            monounsaturated_fat,
            polyunsaturated_fat,
            protein,
            calories,
            carbohydrate,
            cholesterol,
            sodium,
            potassium,
            fiber, sugar,
            vitamin_a,
            vitamin_c,
            calcium,
            iron,
            food
        })
    } catch (error) {
        console.log(error)
    }
}

export const getsdnuitri = async (date) => {
    try {
        return apiRequest.get('/getsdnuitri', {
            params: { date }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getrangedaynuitri = async (startdate, enddate) => {
    try {
        return apiRequest.get('/getrangedaynuitri', {
            params: { startdate, enddate }
        })
    } catch (error) {
        console.log(error)
    }
}