import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //
  private readonly logger = new Logger(JwtStrategy.name)

  /**
   *
   */
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretstring'
    })
  }

  /**
   *
   */
  async validate(payload: any) {
    this.logger.log('validate(payload) called')
    const result = { userId: payload.sub, emailAdress: payload.emailAdress }
    this.logger.log(`validate(payload) - result = ${result}`)
    return result
  }
}
