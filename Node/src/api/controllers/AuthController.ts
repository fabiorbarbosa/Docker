import express, { Request, Response } from 'express'
import { autoInjectable } from 'tsyringe'
import AuthService from '../services/AuthService'
import IController from '../models/IController'
import { sign } from 'jsonwebtoken';
import { auth } from '../../config/auth';

@autoInjectable()
class AuthController implements IController {
  public path = '/auth'
  public router = express.Router()
  private readonly _authService: AuthService
  private readonly _auth = {
    secret: String(process.env.SECRET),
    expires: '1h'
  }

  constructor(authService: AuthService) {
    this._authService = authService
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post(this.path, (_req, _res) => this.post(_req, _res))
  }

  async post(request: Request, response: Response) {
    console.log(request.body)
    const { username, password } = request.body;
    if (!username || !password) {
      return response.status(400).send({message: 'Erro na requisição'})
    }
    const user = await this._authService.authenticate(username, password)
    if (user) {
      const token = sign(
        {
          _id: user.id,
          name: user.name,
        },
        this._auth.secret,
        {
          expiresIn: this._auth.expires,
        }
      );
      return response.status(200).send({token: token})
    }

    return response.status(401).send({message: 'Usuário ou senha inválidos' })
  }
}

export default AuthController
