import { Logger, ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app/app.module'
import { TransformInterceptor } from './app/common/interceptors/transform.interceptor'
import { environment as env } from './environments/environment'

async function bootstrap() {
  const port = process.env.PORT || 3000
  const mode = env.production ? 'production' : 'development'

  /**
   * This project contains a hybrid application (HTTP + TCP)
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 }
  })
  await app.startAllMicroservices()

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
    .setTitle('Share-a-Meal Backend API')
    .setDescription('API documentation for the Android Share-a-Meal app.')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
  Logger.log(
    `Application is running in ${mode} mode on ${await app.getUrl()}`,
    'Main'
  )
}
bootstrap()
