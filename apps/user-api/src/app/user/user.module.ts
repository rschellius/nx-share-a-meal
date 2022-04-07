import { UserEntity } from '@cswp/api-interfaces'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './api/user.controller'
import { UserRepository } from './persistence/user.repository'
import { UserService } from './persistence/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository, UserService]
  // exports: [UserRepository, UserService]
})
export class UserModule {}
