import { UserEntity } from '@cswp/api-interfaces'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './api/user.controller'
import { UserRepository } from './persistence/user.repository'
import { UserService } from './persistence/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),

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
    ])
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService]
})
export class UserModule {}
