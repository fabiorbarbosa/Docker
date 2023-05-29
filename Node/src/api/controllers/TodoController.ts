import express, { Request, Response } from 'express'
import { autoInjectable } from 'tsyringe'
import TodoService from '../services/TodoService'
import IController from '../models/IController'
import { authorize } from '../middlewares/Authorize'
import { NextFunction } from 'express-serve-static-core'

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
    this.router.get(`${this.path}/:todoId`, authorize, (_req, _res, _next) => this.getById(_req, _res, _next))
    this.router.get(this.path, authorize, (_req, _res) => this.getAll(_req, _res))
    this.router.post(this.path, authorize, (_req, _res) => this.post(_req, _res))
  }

  async getAll(request: Request, response: Response) {
    const todos = await this._todoService.getAll()
    return response.status(todos.length > 0 ? 200 : 204).send(todos)
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    var params = request.params
    if (params && params.todoId) {
      console.log(params.todoId);
      const todo = await this._todoService.getById(params.todoId)
      return response.status(todo ? 200 : 204).send(todo)
    }
    next()
  }

  async post(request: Request, response: Response) {
    return response.send(null)
  }
}

export default TodoController
