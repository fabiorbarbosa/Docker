import express, { Request, Response } from 'express'
import DbContext from '../../infra/db/dbcontext'
import iController from '../models/iController'

class Todo implements iController {
  public path = '/todos'
  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getAll)
    this.router.post(this.path, this.post)
  }

  private async getAll(request: Request, response: Response) {
    const _dbContext = new DbContext()

    await _dbContext.connect()

    const db = _dbContext.getDatabase()

    if (!db) return response.send(null).status(404)

    const collection = db.collection('todos')
    const results = await collection.find({}).toArray()

    response.send(results).status(200)
  }

  private async post(request: Request, response: Response) {
    response.send(null)
  }
}

export default Todo
