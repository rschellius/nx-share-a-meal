/**
 * https://github.com/Webeleon/unit-testing-nestjs-using-typeorm-in-memory
 */
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../../api/src/app/user/user.entity'
import { Meal } from '../../../api/src/app/meal/meal.entity'

const entities = [__dirname + '/**/*.entity.{ts,js}']

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'mysql',
    // host: configService.get('MYSQL_HOSTNAME'),
    // port: +configService.get<number>('MYSQL_PORT'),
    username: 'testuser',
    password: 'secret',
    database: 'testdb',
    entities: [Meal, User],
    synchronize: true,
    retryAttempts: 1
  }),
  TypeOrmModule.forFeature([User, Meal])
]
