import { InjectionToken } from "tsyringe"
import AuthController from "./controllers/AuthController"
import TodoController from "./controllers/TodoController"
import IController from "./models/IController"

export interface TYPE {
  controller: InjectionToken<IController>
}

export const TYPES = [
  { controller: TodoController },
  { controller: AuthController },
] as Array<TYPE>
