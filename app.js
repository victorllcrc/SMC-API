const express = require('express')
const dotenv = require('dotenv')
//const bodyparser = require("body-parser");

const connectDB = require('./database/connection')

const app = express()
app.use(express.json());
//app.use(bodyparser.urlencoded({ extended : true}))
dotenv.config()
connectDB()

const PORT = process.env.PORT || 8080

app.use('/', require('./routes/router'))
app.get('/', (req, res) => { res.send('¡Hola Mundo!'); });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})