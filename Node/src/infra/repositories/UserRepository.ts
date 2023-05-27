import { injectable } from 'tsyringe'
import DbContext from '../db/Dbcontext'
import User from '../../api/models/User'

@injectable()
export default class UserRepository {
  private readonly _dbContext: DbContext

  constructor(dbContext: DbContext) {
    this._dbContext = dbContext
  }

  async getByUsername(username: string): Promise<User> {
    await this._dbContext.connect()
    const db = this._dbContext.getDatabase()

    if (!db) return null

    const collection = db.collection<User>('users')
    return await collection.findOne({ 'username': username });
  }
}
