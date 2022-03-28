import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'

@Controller()
export class AppController {
  //
  private readonly logger = new Logger(AppController.name)

  @MessagePattern({ cmd: 'sum' })
  sum(@Payload() data: number[], @Ctx() context: RmqContext): number {
    this.logger.log(`Pattern: ${context.getPattern()} received`)
    return (data || []).reduce((a, b) => a + b)
  }
}
