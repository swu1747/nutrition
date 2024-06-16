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

const addCalBurn = () => {
    
}