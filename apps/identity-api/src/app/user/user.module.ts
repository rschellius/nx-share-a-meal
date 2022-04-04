import { Module } from '@nestjs/common'
import { UserController } from './api/user.controller'
import { UserRepository } from './persistence/user.repository'
import { UserService } from './persistence/user.service'

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService]
})
export class UserModule {}
