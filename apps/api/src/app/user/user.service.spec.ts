import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { User } from './user.entity'

const mockUser = {
  firstName: 'firstname',
  lastName: 'lastname',
}

describe('UsersService', () => {
  let service: UserService
  // let model: Model<User>

  const usersArray = [
    {
      id: 0,
      firstName: 'firstname',
      lastName: 'lastname',
      isActive: true,
      password: 'secret',
      emailAdress: 'user@server.com',
      phoneNumber: '06-12345678',
    },
    {
      id: 0,
      firstName: 'firstname',
      lastName: 'lastname',
      isActive: true,
      password: 'secret',
      emailAdress: 'user@server.com',
      phoneNumber: '06-12345678',
    },
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: User,
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    // model = module.get<Model<User>>()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return all users', async () => {
    // jest.spyOn(model, 'find').mockReturnValue({
    //   exec: jest.fn().mockResolvedValueOnce(usersArray),
    // } as any)
    // const users = await service.findAll()
    // expect(users).toEqual(usersArray)
  })

  it('should insert a new user', async () => {
    // jest.spyOn(model, 'create').mockImplementationOnce(() =>
    //   Promise.resolve({
    //     firstName: 'firstname',
    //     lastName: 'lastname',
    //   })
    // )
    // const newUser = await service.create({
    //   id: 0,
    //   firstName: 'firstname',
    //   lastName: 'lastname',
    //   isActive: true,
    //   password: 'secret',
    //   emailAdress: 'user@server.com',
    //   phoneNumber: '06-12345678',
    // })
    // expect(newUser).toEqual(mockUser)
  })
})
