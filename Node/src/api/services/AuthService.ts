import { injectable } from 'tsyringe'
import UserRepository from '../../infra/repositories/UserRepository'
import User from '../models/User'

@injectable()
export default class AuthService {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async authenticate(username: string, password: string): Promise<User> {
    const _user = await this._userRepository.getByUsername(username)
    return _user && _user.password === password ? _user : null
  }
}
