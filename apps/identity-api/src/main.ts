import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'
import { environment as env } from './environments/environment'

async function bootstrap() {
  const port = process.env.PORT || 8877
  const mode = env.production ? 'production' : 'development'

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883'
    }
  })
  Logger.log(
    `Microservice is listening in ${mode} mode on port ${port}`,
    'Main'
  )
}
bootstrap()
