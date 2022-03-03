import { Repository, EntityRepository } from 'typeorm'
import { Meal } from './meal.entity'
import { UpdateMealDto } from './meal.dto'
import { Logger } from '@nestjs/common'

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {
  // Logging
  private readonly logger = new Logger(MealRepository.name)

  /**
   *
   * @param id
   * @param updateMealDto
   * @returns
   */
  public async editMeal(
    id: number,
    updateMealDto: UpdateMealDto
  ): Promise<Meal> {
    this.logger.log('editMeal id=' + id)
    let meal = await this.findOne(id)
    meal = { ...meal, ...updateMealDto }
    await this.save(meal)
    return meal
  }
}
