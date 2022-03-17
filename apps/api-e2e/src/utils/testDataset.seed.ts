import { getConnection } from 'typeorm'
import { User } from '../../../api/src/app/user/user.entity'
import { Meal } from '../../../api/src/app/meal/meal.entity'

export const testDatasetSeed = async () => {
  const connection = await getConnection()
  const entityManager = connection.createEntityManager()

  //   entityManager.insert<Meal>(Meal, {
  //     name: 'moa',
  //     type: 'cruiser',
  //     origin: 'caldari',
  //   });
  //   entityManager.insert<Meal>(Meal, {
  //     name: 'caracal',
  //     type: 'cruiser',
  //     origin: 'caldari',
  //   });
  //   entityManager.insert<Meal>(Meal, {
  //     name: 'rokh',
  //     type: 'battleship',
  //     origin: 'caldari',
  //   });
}
