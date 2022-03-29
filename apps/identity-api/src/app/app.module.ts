import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@cswp/api-interfaces'
import { UserModule } from '@cswp/feature'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: 'API_QUEUE_SERVICE', // beter: 'user-identity-queue'
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
    ]),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOSTNAME'),
        port: +configService.get<number>('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASENAME'),
        entities: [UserEntity],
        synchronize: true,
        retryAttempts: 1
      }),
      inject: [ConfigService]
    }),

    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
