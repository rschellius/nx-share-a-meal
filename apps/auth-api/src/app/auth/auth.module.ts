import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),

    ClientsModule.registerAsync([
      {
        name: 'USER_CLIENT',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('USER_API_MICROSERVICE_HOSTNAME'),
            port: configService.get<number>('USER_API_MICROSERVICE_PORT')
          }
        }),
        inject: [ConfigService]
      }
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'veryverysecretstring',
      signOptions: { expiresIn: '24 days' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
