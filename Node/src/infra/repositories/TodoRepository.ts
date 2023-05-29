import { injectable } from 'tsyringe'
import DbContext from '../db/Dbcontext'
import Todo from '../../api/models/Todo'
import { ObjectId } from 'mongodb'

@injectable()
export default class TodoRepository {
  private readonly _dbContext: DbContext

  constructor(dbContext: DbContext) {
    this._dbContext = dbContext
  }

  async getAll(): Promise<Todo[]> {
    await this._dbContext.connect()
    const db = this._dbContext.getDatabase()

    if (!db) return []

    const collection = db.collection<Todo>('todos')
    return await collection.find({}).toArray()
  }

  async getById(id: string): Promise<Todo> {
    await this._dbContext.connect()
    const db = this._dbContext.getDatabase()

    if (!db) return null

    const collection = db.collection<Todo>('todos')
    return await collection.findOne({_id: new ObjectId(id)})
  }
}
