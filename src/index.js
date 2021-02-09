import express from 'express'
import http from 'http'
import cors from 'cors'
import apis from './routes/apis'
import RealtimeService from './services/RealtimeService'

require('dotenv').config()

const app = express()

const server = http.createServer(app)

app.use(express.json())
app.use(cors())
app.set('RealtimeService', new RealtimeService(server, { cors: { origin: '*' } }))

app.use('/apis', apis)

app.get('*', (req, res) => res.status(404).send('404 Not Found'))

server.listen(process.env.PORT, () => console.log(`running on ${process.env.PORT}`))
