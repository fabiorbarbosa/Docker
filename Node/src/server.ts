import 'reflect-metadata'
import express from 'express'
import { TYPES, TYPE } from './api'
import { container } from 'tsyringe'
import IController from './api/models/IController'

class Server {
  public app: express.Application
  public port: string | undefined

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? '3000'
    this.initializeMiddlewares()
    this.initializeControllers()
  }

  private initializeMiddlewares() {
    this.app.use(express.json())
    this.app.set('json spaces', 2)
  }

  private initializeControllers() {
    TYPES.forEach((type: TYPE) => {
      console.log(type)
      const controller = container.resolve(type.controller) as IController
      this.app.use('/', controller.router)
    })
  }

  public listen(): void {
    this.app.listen(this.port, () =>
      console.log(`listening on http://localhost:${this.port}`),
    )
  }
}

export default Server
