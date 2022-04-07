import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class RabbitMqAuthGuard implements CanActivate {
  private readonly logger = new Logger(RabbitMqAuthGuard.name)

  constructor(
    @Inject('API_QUEUE_SERVICE') private readonly client: ClientProxy
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('canActivate')
    const request = context.switchToHttp().getRequest()
    // const user = request.user
    return this.validateRequest(request)
  }

  private validateRequest(request) {
    const pattern = { cmd: 'sum' }
    const data = [1, 2, 3, 4, 5]
    return this.client.send<number>(pattern, data)

    // return true
  }
}
