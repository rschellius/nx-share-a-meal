import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MealController } from './meal.controller'
import { MealService } from './meal.service'
import { MealRepository } from './meal.repository'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '../auth/auth.guards'
import { UsersModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository]), UsersModule],
  controllers: [MealController],
  providers: [
    MealService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [TypeOrmModule, MealService]
})
export class MealsModule {}
