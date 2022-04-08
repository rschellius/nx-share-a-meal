import { Controller, Get, Inject, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { Public } from './common/decorators/decorators'

@Controller()
export class MathController {
  //
  private readonly logger = new Logger(MathController.name)

  constructor(
    @Inject('API_QUEUE_SERVICE') private readonly client: ClientProxy
  ) {}

  @Public()
  @Get('sum')
  execute(): Observable<number> {
    this.logger.log('/api/sum request received')

    const pattern = { cmd: 'sum' }
    const data = [1, 2, 3, 4, 5]
    return this.client.send<number>(pattern, data)
  }
}
