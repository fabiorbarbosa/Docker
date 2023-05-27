import dotenv from 'dotenv'
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env"
})
import 'reflect-metadata'
import Server from './src/Server'

console.log(process.env.NODE_ENV)

const app = new Server()

app.listen()
