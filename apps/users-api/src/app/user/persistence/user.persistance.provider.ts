import { Provider } from '@nestjs/common'
import { UserRepository } from './user.repository'

export const UserRepoProvider: Provider = {
  provide: 'UserRepository',
  useClass: UserRepository
}
