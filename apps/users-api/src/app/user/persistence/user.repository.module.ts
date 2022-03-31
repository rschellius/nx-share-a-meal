import { Module } from '@nestjs/common'
import { UserRepoProvider } from './user.persistance.provider'

@Module({
  imports: [],
  providers: [UserRepoProvider],
  exports: [UserRepoProvider]
})
export class UserRepositoryModule {}
