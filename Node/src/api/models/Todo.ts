import { ObjectId } from "mongodb"

interface Todo {
  _id: ObjectId
  todo: string
  completed: boolean
}

export default Todo
