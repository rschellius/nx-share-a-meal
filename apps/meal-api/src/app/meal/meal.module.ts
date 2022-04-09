import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MealController } from './meal.controller'
import { MealService } from './meal.service'
import { MealRepository } from './meal.repository'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  ClientProxyFactory,
  ClientsModule,
  Transport
} from '@nestjs/microservices'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: 'AUTH_CLIENT',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_API_MICROSERVICE_HOSTNAME'),
            port: configService.get<number>('AUTH_API_MICROSERVICE_PORT')
          }
        }),
        inject: [ConfigService]
      }
    ]),

    TypeOrmModule.forFeature([MealRepository])
  ],
  controllers: [MealController],
  providers: [
    MealService,
    {
      provide: 'API_QUEUE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('RABBITMQ_USER')
        const password = configService.get<string>('RABBITMQ_PASSWORD')
        const host = configService.get<string>('RABBITMQ_HOST')
        const queueName = configService.get<string>('API_RMQ_QUEUE_NAME')

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [ConfigService]
    }
  ],
  exports: [TypeOrmModule, MealService]
})
export class MealsModule {}
