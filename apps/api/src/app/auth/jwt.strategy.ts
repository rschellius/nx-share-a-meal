import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Inject, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
// extends PassportStrategy(Strategy)
export class JwtStrategy {
  //
  private readonly logger = new Logger(JwtStrategy.name)

  /**
   *
   */
  constructor(
    @Inject('API_QUEUE_SERVICE') private readonly client: ClientProxy
  ) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: process.env.JWT_SECRET || 'secretstring'
    // })
  }

  /**
   *
   */
  async validate(payload: any) {
    this.logger.log(`validate(${payload}) called`)
    return { userId: payload.sub, emailAdress: payload.emailAdress }
  }
}
