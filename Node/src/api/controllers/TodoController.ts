import express, { Request, Response } from 'express'
import { autoInjectable } from 'tsyringe'
import TodoService from '../services/TodoService'
import IController from '../models/IController'

@autoInjectable()
class TodoController implements IController {
  public path = '/todos'
  public router = express.Router()
  private readonly _todoService: TodoService

  constructor(todoService: TodoService) {
    this._todoService = todoService
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.get(this.path, (_req, _res) => this.getAll(_req, _res))
    this.router.post(this.path, (_req, _res) => this.post(_req, _res))
  }

  async getAll(request: Request, response: Response) {
    const todos = await this._todoService.getAll()
    return response.send(todos).status(todos.length > 0 ? 200 : 404)
  }

  async post(request: Request, response: Response) {
    return response.send(null)
  }
}

export default TodoController
