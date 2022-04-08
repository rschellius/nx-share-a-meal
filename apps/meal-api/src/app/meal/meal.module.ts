import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MealController } from './meal.controller'
import { MealService } from './meal.service'
import { MealRepository } from './meal.repository'
import { ConfigService } from '@nestjs/config'
import {
  ClientProxyFactory,
  ClientsModule,
  Transport
} from '@nestjs/microservices'

@Module({
  imports: [
    TypeOrmModule.forFeature([MealRepository]),

    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4010
        }
      }
    ])
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
