import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'
import { TransformInterceptor } from './app/common/interceptors/transform.interceptor'
import { environment as env } from './environments/environment'

async function bootstrap() {
  const port = process.env.PORT || 3030
  const mode = env.production ? 'production' : 'development'

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
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('api')

  const corsOptions: CorsOptions = {}
  app.enableCors(corsOptions)

  const config = new DocumentBuilder()
    .setTitle('Identity API')
    .setDescription('Documentation for the Identity API backend server.')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
  Logger.log(
    `Identity API is running in ${mode} mode on ${await app.getUrl()}`,
    'Main'
  )
}
bootstrap()
