import { injectable } from 'tsyringe'
import TodoRepository from '../../infra/repositories/TodoRepository'

@injectable()
export default class TodoService {
  private readonly _todoRepository: TodoRepository

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository
  }

  async getAll() {
    return await this._todoRepository.getAll()
  }

  async getById(_id: string) {
    return await this._todoRepository.getById(_id)
  }
}
