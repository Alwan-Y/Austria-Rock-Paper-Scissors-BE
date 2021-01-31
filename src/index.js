import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/apis'

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

// app.use('/apis', apis)

app.use('/', apiRoutes)
app.get('*', (req, res) => res.status(404).send('404 Not Found'))

app.listen(process.env.APP_PORT, () => console.log(`running on ${process.env.APP_PORT}`))
