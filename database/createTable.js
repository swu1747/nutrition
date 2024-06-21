const dayjs = require('dayjs');
const { Client } = require('pg')

const client = new Client(
    {
        host: 'localhost',
        port: 1747,
        database: 'postgres',
        password: '1747',
        user: 'postgres'
    }
)

client.connect().then(() => {
    console.log('HHHh')
})

const addCalBurn = async (exercise, userid, starttime, endtime, calpermin) => {
    try {
        const query = `INSERT INTO calburndetail(exercise, calpermin, userid, starttime, endtime) VALUES ($1, $2, $3, $4, $5)`;
        const values = [exercise, calpermin, userid, starttime, endtime];
        const res = await client.query(query, values);
        return res;
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};
const fetchCalBydate = async (date, userid) => {
    try {
        const query = 'SELECT * FROM calburndetail WHERE starttime::date = $1 AND userid = $2'
        const values = [date, userid]
        const res = await client.query(query, values)
        return res.rows
    } catch (error) {
        console.error(error);
        throw error;

    }
}

const addCalPerDay = async (userid, totalCal) => {
    try {
        const query = 'INSERT INTO calperday (userid, cal_toal)  VALUES ($1, $2)'
        const values = [userid, totalCal]
        const res = await client.query(query, values)
        return res
    } catch (error) {
        throw error;
    }
}

const fetchSingleDayTotalCal = async (userid, date) => {
    try {
        const query = 'SELECT * FROM calperday WHERE date::date = $1 AND userid = $2'
        const values = [date, userid]
        const res = await client.query(query, values)
        return res.rows
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchRangeDayTotalCal = async (userid, startdate, enddate) => {
    try {
        const query = 'SELECT * FROM calperday WHERE date::date BETWEEN $1 AND $2 AND userid = $3'
        const values = [startdate, enddate, userid]
        const res = await client.query(query, values)
        return res.rows
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const incrementSingleDayCal = async (userid, date, cal) => {
    try {
        const query = ` UPDATE calperday SET cal_toal = cal_toal + $1 
        WHERE date::date = $2 AND userid = $3
        `
        const values = [cal, date, userid]
        const res = await client.query(query, values)
        return res
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addNuitri = async (userid, fat, saturated_fat, trans_fat, monounsaturated_fat, polyunsaturated_fat, protein, calories, carbohydrate, cholesterol, sodium, potassium, fiber, sugar, vitamin_a, vitamin_c, calcium, iron, food) => {
    try {
        const query = `INSERT INTO nuitridetail 
        (userid,fat,saturated_fat,trans_fat,monounsaturated_fat,polyunsaturated_fat,protein,calories,carbohydrate,cholesterol,sodium,potassium,fiber,sugar,vitamin_a,vitamin_c,calcium,iron,food)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`
        const values = [userid, fat, saturated_fat, trans_fat, monounsaturated_fat, polyunsaturated_fat, protein, calories, carbohydrate, cholesterol, sodium, potassium, fiber, sugar, vitamin_a, vitamin_c, calcium, iron, food]
        const res = await client.query(query, values)
        return res
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findNutriSingleDay = async (userid, date) => {
    try {
        const query = `SELECT * FROM nuitridetail WHERE time::date = $1 AND userid = $2`
        const values = [date, userid]
        const res = await client.query(query, values)
        return res.rows
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findNutriRangedDay = async (userid, startdate, enddate) => {
    try {
        const query = `SELECT * FROM nuitridetail WHERE time::date BETWEEN $1 AND $2 AND userid = $3`
        const values = [startdate, enddate, userid]
        const res = await client.query(query, values)
        return res.rows
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    addCalBurn,
    fetchCalBydate,
    addCalPerDay,
    fetchSingleDayTotalCal,
    fetchRangeDayTotalCal,
    incrementSingleDayCal,
    addNuitri,
    findNutriSingleDay,
    findNutriRangedDay

}
// findNutriRangedDay('123', '2024-06-19', '2024-06-28').then((res) => {
//     console.log(res)
// })
// findNutriSingleDay('123', '2024-06-19').then((res) => {
//     console.log(res.rows)
// })

// addNuitri('123', 0.12, 11, 0.13, 0, 13, 1, 3, 4, 5, 6, 0.99, 0.11, 4.11, 2, 0.001, 0.024, 14, 'kk').then((res) => {
//     console.log(res)
// })

// incrementSingleDayCal('2332','2024-06-23',1000).then((res)=>{
//     console.log(res)
// })
// fetchRangeDayTotalCal('2332','2024-06-19','2024-06-20').then((res)=>{
//     console.log(res)
// })

// fetchSingleDayTotalCal('2332', '2024-06-17').then((res) => {
//     console.log(res)
// })

// fetchCalBydate('2024-06-17', '1234123').then((res) => {
//     console.log(res)
//     const temp = dayjs(res[0].endtime)
//     console.log(temp.format())
// })

// addCalBurn('kaaak', '1234123', '2024-06-17T17:11:09-04:00', '2024-06-17T17:15:09-04:00', 23).then((res) => {
//     console.log(res)
// })

// addCalPerDay('2332', '123123').then((res) => {
//     console.log('>>>', res)
// })

