import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: 'API_QUEUE_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            queue: configService.get<string>('API_RMQ_QUEUE_NAME'),
            urls: [configService.get<string>('API_RMQ_QUEUE_URL')],
            queueOptions: {
              durable: configService.get<boolean>(
                'API_RMQ_QUEUE_OPTION_DURABLE'
              )
            }
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
