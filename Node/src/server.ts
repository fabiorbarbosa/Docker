import 'reflect-metadata'
import express from 'express'
import TYPES from './api'
import { container } from 'tsyringe'
import IController from './api/models/IController'
import TodoController from './api/controllers/TodoController'

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
    TYPES.forEach((type) => {
      const controller = container.resolve(TodoController) as IController
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
