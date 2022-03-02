import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../user/user.repository'
import { UpdateMealDto } from './meal.dto'
import { Meal } from './meal.entity'
import { MealRepository } from './meal.repository'

@Injectable()
export class MealService {
  // Logging
  private readonly logger = new Logger(MealService.name)

  /**
   *
   * @param mealRepository
   * @param userRepository
   */
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  /**
   *
   * @returns
   */
  public async findAll(): Promise<Meal[]> {
    this.logger.log('findAll')
    return await this.mealRepository.find({
      relations: ['cook', 'participants']
    })
  }

  /**
   *
   * @param id
   * @returns
   */
  public async findOne(id: number): Promise<Meal> {
    this.logger.log('findOne')
    const meal = await this.mealRepository.findOne(id, {
      relations: ['cook', 'participants']
    })
    if (!meal) {
      throw new NotFoundException(`Meal #${id} not found`)
    }
    return meal
  }

  /**
   *
   * @param createMealDto
   * @returns
   */
  public async create(createMealDto: Meal): Promise<Meal> {
    this.logger.log('create ' + createMealDto.name)

    try {
      return await this.mealRepository.save(createMealDto)
    } catch (err) {
      Logger.warn('Error: ' + err.code + ' ' + err.sqlMessage)
      throw new HttpException(err.code, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   *
   * @param mealId
   * @param updateMealDto
   * @returns
   */
  public async update(
    mealId: number,
    updateMealDto: UpdateMealDto,
    userId: number
  ): Promise<Meal> {
    this.logger.log('update mealId=' + mealId)

    const meal = await this.mealRepository.findOne(mealId)
    if (!meal) {
      throw new NotFoundException(`Meal #${mealId} not found`)
    }
    // const cook = await this.userRepository.findOne(userId)
    if (meal.cook.id !== userId) {
      this.logger.log(
        `User ${userId} is not allowed to edit meal of cook ${meal.cook.id}`
      )
      throw new BadRequestException(`Not allowed to edit.`)
    }
    return this.mealRepository.editMeal(mealId, updateMealDto)
  }

  /**
   *
   * @param id
   * @param updateMealDto
   * @returns
   */
  public async participate(mealId: number, userId: number): Promise<void> {
    this.logger.log('participate mealId=' + mealId + ' participant=' + userId)

    const meal = await this.mealRepository.findOne(mealId, {
      // relations: ['participants']
    })
    if (!meal) {
      throw new NotFoundException(`Meal #${mealId} not found`)
    }
    const participant = await this.userRepository.findOne({ id: userId })
    if (!participant) {
      throw new NotFoundException(`Participant #${userId} not found`)
    }
    this.logger.log('participant = ' + participant.firstName)
    if (meal.participants.length >= meal.maxAmountOfParticipants) {
      throw new BadRequestException(`Max amount of participants reached.`)
    }
    meal.participants = [...meal.participants, participant]

    await this.mealRepository.save(meal)
    return
  }

  /**
   *
   * @param id
   */
  public async remove(mealId: number, userId: number): Promise<void> {
    this.logger.log('remove id=' + mealId)
    const meal = await this.mealRepository.findOne(mealId)
    if (!meal) {
      throw new NotFoundException(`Meal #${mealId} not found`)
    }
    this.logger.log(
      `remove mealId=${mealId} userId=${userId} ownerId=${meal.cook.id}`
    )
    const cook = await this.userRepository.findOne(userId)
    if (meal.cook !== cook) {
      throw new BadRequestException(`Not allowed to delete.`)
    }
    await this.mealRepository.delete(mealId)
  }
}
