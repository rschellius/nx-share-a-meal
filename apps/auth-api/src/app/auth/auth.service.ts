import {
  Inject,
  Injectable,
  Logger,
  RequestTimeoutException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { catchError, throwError, timeout, TimeoutError } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`validate(${email}, password) called`)

    try {
      const user = await this.client
        .send(
          { role: 'user', cmd: 'get' },
          {
            emailAdress: email
          }
        )
        .pipe(
          timeout(5000),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException())
            }
            return throwError(err)
          })
        )
        .toPromise()

      if (bcrypt.compareSync(password, user?.password)) {
        return user
      }

      return null
    } catch (e) {
      Logger.log(e)
      throw e
    }
  }

  validateToken(jwt: string) {
    this.logger.log(`validateToken`)
    return this.jwtService.verify(jwt)
  }

  async login(user) {
    this.logger.log(`login`)
    const payload = { userId: user.id }
    const result = {
      userId: user.id,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
      token: this.jwtService.sign(payload)
    }
    return result
  }
}
