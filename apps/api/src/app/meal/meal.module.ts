import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MealController } from './meal.controller'
import { MealService } from './meal.service'
import { MealRepository } from './meal.repository'
// import { APP_GUARD } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
// import { JwtAuthGuard } from '../auth/auth.guards'

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository])],
  controllers: [MealController],
  providers: [
    MealService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
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
