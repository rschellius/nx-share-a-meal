import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name)

  /**
   *
   */
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'emailAdress',
      passwordField: 'password'
    })
  }

  /**
   *
   */
  async validate(emailAdress: string, password: string): Promise<any> {
    this.logger.log('validate(emailAdress, password) called')
    const user = await this.authService.validateUser(emailAdress, password)
    if (!user) {
      this.logger.log('user not found')
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'email not found or password invalid'
      })
    } else {
      // HIER KUN JE BEPALEN WAT JE RETOURNEERT. user wordt aan req toegevoegd naar next()!
      return user
    }
  }
}
