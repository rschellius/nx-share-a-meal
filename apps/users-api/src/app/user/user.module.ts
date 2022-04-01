import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './api/user.controller'
import { UserEntity } from './persistence/user.entity'
import { UserRepoProvider } from './persistence/user.persistance.provider'
import { UserRepositoryModule } from './persistence/user.repository.module'

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity]), UserRepositoryModule],
  providers: [UserRepoProvider],
  exports: [UserRepoProvider]
})
export class UserModule {}
