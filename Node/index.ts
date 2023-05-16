import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import Server from './src/Server'
import { env } from 'node:process';

// console.log(env)
console.log(process.env)

const app = new Server()

app.listen()
