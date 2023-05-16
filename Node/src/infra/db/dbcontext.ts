import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { autoInjectable } from 'tsyringe'

@autoInjectable()
class DbContext {
  private _connectionString: string | undefined
  _client: MongoClient | undefined
  _dbConnection: MongoClient | undefined

  constructor() {
    this.createClient()
  }

  async connect() {
    try {
      this.createClient()
      this._dbConnection = await this._client?.connect()
    } catch (e) {
      console.error(e)
    }
  }

  private createClient(): void {
    if (!this._client) {
      dotenv.config()
      this._connectionString = process.env.CONN_MONGO
      if (this._connectionString !== undefined)
        this._client = new MongoClient(this._connectionString)

      console.log(this._connectionString)
    }
  }

  getDatabase() {
    return this._dbConnection?.db('todo-list')
  }
}

export default DbContext
