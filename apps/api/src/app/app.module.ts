import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MealsModule } from './meal/meal.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/auth.guards'
import { Meal } from './meal/meal.entity'
import { User } from './user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOSTNAME'),
        port: +configService.get<number>('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASENAME'),
        entities: [Meal, User],
        synchronize: true,
        retryAttempts: 1
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),
    AuthModule,
    UsersModule,
    MealsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
