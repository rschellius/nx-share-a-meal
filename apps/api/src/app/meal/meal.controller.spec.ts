// import { Test, TestingModule } from '@nestjs/testing'
// import { MealController } from './meal.controller'
// import { CreateMealDto } from './meal.dto'
// import { Meal } from './meal.entity'
// import { MealService } from './meal.service'

// describe('Meals Controller', () => {
//   let controller: MealController
//   let service: MealService
//   const createMealDto: CreateMealDto = {
//     name: 'Spaghetti Bolognese',
//     description: 'Dé pastaklassieker bij uitstek.',
//     isActive: true,
//     isVega: false,
//     isVegan: false,
//     isToTakeHome: true,
//     dateTime: new Date('2022-02-22T13:35:18.400Z'),
//     maxAmountOfParticipants: 6,
//     price: 6.75,
//     imageUrl:
//       'https://miljuschka.nl/wp-content/uploads/2021/02/Pasta-bolognese-3-2.jpg',
//     userId: ,
//   }

//   const mockMeal = {
//     ...createMealDto,
//     id: 1,
//   }

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MealController],
//       providers: [
//         {
//           provide: MealService,
//           useValue: {
//             findAll: jest.fn().mockResolvedValue([
//               {
//                 name: 'Meal #1',
//                 breed: 'Bread #1',
//                 age: 4,
//               },
//               {
//                 name: 'Meal #2',
//                 breed: 'Breed #2',
//                 age: 3,
//               },
//               {
//                 name: 'Meal #3',
//                 breed: 'Breed #3',
//                 age: 2,
//               },
//             ]),
//             create: jest.fn().mockResolvedValue(createMealDto),
//           },
//         },
//       ],
//     }).compile()

//     controller = module.get<MealController>(MealController)
//     service = module.get<MealService>(MealService)
//   })

//   describe('create()', () => {
//     it('should create a new meal', async () => {
//       const createSpy = jest
//         .spyOn(service, 'create')
//         .mockResolvedValueOnce(mockMeal)

//       await controller.create(createMealDto)
//       expect(createSpy).toHaveBeenCalledWith(createMealDto)
//     })
//   })

//   describe('findAll()', () => {
//     it('should return an array of meals', async () => {
//       expect(controller.findAll()).resolves.toEqual([
//         {
//           name: 'Meal #1',
//           breed: 'Bread #1',
//           age: 4,
//         },
//         {
//           name: 'Meal #2',
//           breed: 'Breed #2',
//           age: 3,
//         },
//         {
//           name: 'Meal #3',
//           breed: 'Breed #3',
//           age: 2,
//         },
//       ])
//       expect(service.findAll).toHaveBeenCalled()
//     })
//   })
// })
