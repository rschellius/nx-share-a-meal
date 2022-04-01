import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule)
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)

  const user = configService.get('RABBITMQ_USER')
  const password = configService.get('RABBITMQ_PASSWORD')
  const host = configService.get('RABBITMQ_HOST')

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: configService.get<string>('API_RMQ_QUEUE_NAME'),
      queueOptions: {
        durable: configService.get<boolean>('API_RMQ_QUEUE_OPTION_DURABLE')
      }
    }
  })

  // await
  app.startAllMicroservices()

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  app.setGlobalPrefix('api')

  await app.listen(3000)
  Logger.log(`Identity API is running`, 'Main')
}
bootstrap()
