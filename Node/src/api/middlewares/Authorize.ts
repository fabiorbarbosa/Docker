import { NextFunction, Request, Response } from "express"
import { CustomError } from "express-handler-errors"
import { verify } from "jsonwebtoken"

export const authorize = (request: Request, response: Response, next: NextFunction) => {
  let token = request.headers['authorization']
  if (!token) {
    return response.status(401).send({message: 'Token não enviado'})
  }
  try {
    if (token.toLowerCase().indexOf('bearer ') !== -1) {
      token = token.split(' ')[1]
    }
    const decoded = verify(token, process.env.SECRET)
    return next()
  } catch (e) {
    return response.status(401).send({message: 'Token inválido'})
  }
}