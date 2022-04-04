import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../common/decorators/decorators'

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable() // extends AuthGuard('jwt')
export class JwtAuthGuard {
  private readonly logger = new Logger(JwtAuthGuard.name)

  // constructor(private reflector: Reflector) {
  //   super()
  // }

  canActivate(context: ExecutionContext) {
    this.logger.log('canActivate , ALWAYS TRUE!')
    //   const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //     context.getHandler(),
    //     context.getClass()
    //   ])
    //   if (isPublic) {
    //     return true
    //   }
    //   return super.canActivate(context)
    // }
    return true
  }
}
