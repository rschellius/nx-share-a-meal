import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { timeout } from 'rxjs'

/**
 * NestJs API auth guard
 * Uses the Auth Api microservice to validate a given JWT.
 *
 * Usage: in the NestJs Controller, annotate the API endpoint using
 *   @UseGuards(AuthApiGuard)
 */
export class AuthApiGuard implements CanActivate {
  private readonly logger = new Logger(AuthApiGuard.name)

  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    this.logger.log(`canActivate - auth check token`)

    try {
      const payload = await this.client
        .send(
          { role: 'auth', cmd: 'check' },
          { jwt: req.headers['authorization']?.split(' ')[1] }
        )
        .pipe(timeout(5000))
        .toPromise()

      this.logger.log(`canActivate - payload = ${JSON.stringify(payload)}`)
      req.user = payload
      return true
    } catch (err) {
      Logger.error(err)
      return false
    }
  }
}
