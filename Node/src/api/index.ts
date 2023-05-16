import TodoController from "./controllers/TodoController"
import IController from "./models/IController"

interface TYPE {
  controller: object
}

const TYPES = [{ controller: TodoController }] as Array<TYPE>

export default TYPES
