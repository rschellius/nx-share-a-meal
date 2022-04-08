import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)

  const httpPort =
    process.env.PORT || configService.get<number>('AUTH_API_HTTP_PORT')
  const mode = configService.get('NODE_ENV') || 'development'
  const microserviceHostname = configService.get<string>(
    'AUTH_API_MICROSERVICE_HOSTNAME'
  )
  const microservicePort = configService.get<number>(
    'AUTH_API_MICROSERVICE_PORT'
  )

  app.setGlobalPrefix('api')

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: microserviceHostname,
      port: microservicePort
    }
  })

  await app.startAllMicroservices()
  await app.listen(httpPort)
  Logger.log(
    `Auth API is running in ${mode} mode on ${await app.getUrl()}`,
    'Main'
  )
}
bootstrap()
