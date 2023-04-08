import { MongoClient } from 'mongodb'

class DbContext {
  _connectionString: string
  _client: MongoClient
  _dbConnection: MongoClient | undefined

  constructor() {
    this._connectionString =
      process.env.CONN_MONGO ?? 'mongodb://root:root@localhost:27017'
    console.log(this._connectionString)
    this._client = new MongoClient(this._connectionString)
  }

  async connect() {
    try {
      this._dbConnection = await this._client.connect()
      console.log('Connected to MongoDB')
    } catch (e) {
      console.error(e)
    }
  }

  getDatabase() {
    return this._dbConnection?.db('todo-list')
  }
}

export default DbContext
