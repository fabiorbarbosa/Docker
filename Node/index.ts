import Server from './src/server'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env)

const app = new Server()

app.listen()
