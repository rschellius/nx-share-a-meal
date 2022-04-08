import { Logger, ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app/app.module'
import { TransformInterceptor } from '@cswp/api-interfaces'

/**
 *
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get<ConfigService>(ConfigService)

  const httpPort =
    process.env.PORT || configService.get<number>('USER_API_HTTP_PORT')
  const mode = configService.get('NODE_ENV') || 'development'
  const microserviceHostname = configService.get<string>(
    'USER_API_MICROSERVICE_HOSTNAME'
  )
  const microservicePort = configService.get<number>(
    'USER_API_MICROSERVICE_PORT'
  )

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: microserviceHostname,
      port: microservicePort
    }
  })

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
    .setTitle('User API')
    .setDescription('API documentation for the User backend API.')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.startAllMicroservices()
  await app.listen(httpPort)
  Logger.log(
    `User API is running in ${mode} mode on ${await app.getUrl()}`,
    'Main'
  )
}
bootstrap()
