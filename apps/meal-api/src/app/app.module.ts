import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MealsModule } from './meal/meal.module'
// import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Meal, UserEntity } from '@cswp/api-interfaces'
import {
  ClientProxyFactory,
  // ClientsModule,
  Transport
} from '@nestjs/microservices'
import { MathController } from './math.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOSTNAME'),
        port: +configService.get<number>('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASENAME'),
        entities: [Meal, UserEntity],
        synchronize: true,
        retryAttempts: 1
      }),
      inject: [ConfigService]
    }),

    // ClientsModule.registerAsync([
    //   {
    //     name: 'API_QUEUE_SERVICE',
    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => ({
    //       transport: Transport.RMQ,
    //       options: {
    //         queue: configService.get<string>('API_RMQ_QUEUE_NAME'),
    //         urls: [
    //           `amqp://${configService.get('RABBITMQ_USER')}:${configService.get(
    //             'RABBITMQ_PASSWORD'
    //           )}@${configService.get('RABBITMQ_HOST')}`
    //         ],
    //         queueOptions: {
    //           durable: configService.get<boolean>(
    //             'API_RMQ_QUEUE_OPTION_DURABLE'
    //           )
    //         }
    //       }
    //     }),
    //     inject: [ConfigService]
    //   }
    // ]),

    MealsModule
  ],
  controllers: [MathController],
  providers: [
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
  ]
})
export class AppModule {}
