import Todo from './controllers/todo'
import iController from './models/iController'

class Api {
  private _controllers: Array<iController> = []

  constructor() {
    this._controllers.push(new Todo())
  }

  public get controllers(): Array<iController> {
    return this._controllers
  }
}

export default Api
