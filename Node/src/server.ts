import express from 'express'
import Api from './api'
import iController from './api/models/iController'

class Server {
  public app: express.Application
  public port: string | undefined

  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? '3000'
    const api = new Api()
    this.initializeMiddlewares()
    this.initializeControllers(api.controllers)
  }

  private initializeMiddlewares() {
    this.app.use(express.json())
    this.app.set('json spaces', 2)
  }

  private initializeControllers(controllers: Array<iController>) {
    controllers.forEach((controller) => {
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
