import { UserEntity } from '@cswp/api-interfaces'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './api/user.controller'
import { UserRepository } from './persistence/user.repository'
import { UserService } from './persistence/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),

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
  controllers: [UserController],
  providers: [UserRepository, UserService]
})
export class UserModule {}
