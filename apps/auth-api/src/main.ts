import { environment as env } from './environments/environment'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const port = process.env.PORT || 3010
  const mode = env.production ? 'production' : 'development'

  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4000
    }
  })

  await app.startAllMicroservices()
  await app.listen(port)
  Logger.log(
    `Auth API is running in ${mode} mode on ${await app.getUrl()}`,
    'Main'
  )
}
bootstrap()
