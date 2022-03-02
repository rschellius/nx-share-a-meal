import { Injectable, Logger } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/user.entity'

@Injectable()
export class AuthService {
  //
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log('validateUser')
    const user = await this.userService.findOneByEmail(email)
    if (user && user.password === pass) {
      return user
    }
    return null
  }

  async login(user: User) {
    this.logger.log('login ' + user.emailAdress)
    const payload = { email: user.emailAdress, sub: user.id }
    const { password, phoneNumber, ...attribs } = user
    return {
      ...attribs,
      token: this.jwtService.sign(payload)
    }
  }
}
