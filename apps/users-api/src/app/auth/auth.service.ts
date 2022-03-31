import { Inject, Injectable, Logger } from '@nestjs/common'
// import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { IUserRepository } from '../user/domain/iuser.repository'
// import { UserEntity } from '../user/user.entity'

const UserRepository = () => Inject('UserRepository')

@Injectable()
export class AuthService {
  //
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @UserRepository() private userRepository: IUserRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log('validateUser')
    const user = await this.userRepository.findOneByEmail(email)
    if (user && user.password === pass) {
      return user
    }
    return null
  }

  async login(user: any) {
    this.logger.log('login ' + user.emailAdress)
    const payload = { email: user.emailAdress, sub: user.id }
    const { password, phoneNumber, ...attribs } = user
    return {
      ...attribs,
      token: this.jwtService.sign(payload)
    }
  }
}
