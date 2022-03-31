import { IUser } from '@cswp/api-interfaces'

export interface IUserRepository {
  create(user: IUser): Promise<IUser>

  findAll(): Promise<IUser[]>

  findOne(id: string): Promise<IUser>

  findOneByEmail(email: string): Promise<IUser>

  update(
    id: number,
    userDetails: any, // UpdateUserDto,
    ownerId: number
  ): Promise<IUser>

  delete(id: string, owner: IUser): Promise<void>
}
