import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './api/user.controller'
import { UserEntity } from './persistence/user.entity'
import { UserRepository } from './persistence/user.repository'
import { UserRepositoryModule } from './persistence/user.repository.module'
import { UserService } from './persistence/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserRepositoryModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService]
})
export class UserModule {}
