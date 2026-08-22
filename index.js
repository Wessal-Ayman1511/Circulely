import express from 'express'
import bootStrap from './src/app.controller.js'
import morgan from 'morgan'
import chalk from 'chalk'
import { initSocket } from './src/socke.io/index.js'


const app = express()
const port = process.env.PORT || 3000
bootStrap(app, express)
app.use(morgan('short'))


const server = app.listen(port, ()=> {
    console.log(chalk.blue("server is running on port"), port)
})

initSocket(server)