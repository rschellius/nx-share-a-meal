import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
// import { UserRepository } from '../user/user.repository'
import { UpdateMealDto } from './meal.dto'
import { Meal, ParticipationInfo } from '@cswp/api-interfaces'
import { MealRepository } from './meal.repository'

// const UserRepository = () => Inject('UserRepository')

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
    private mealRepository: MealRepository // @InjectRepository(UserRepository) // private userRepository: UserRepository
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
  public async participate(
    mealId: number,
    userId: number
  ): Promise<ParticipationInfo> {
    this.logger.log('participate mealId=' + mealId + ' participant=' + userId)

    throw new BadRequestException(`ToDo, userRepo dependency`)

    /*
    const meal = await this.mealRepository.findOne(mealId)
    if (!meal) {
      throw new NotFoundException(`Meal #${mealId} not found`)
    }
    //
    // userRepository dependency verwijderern - ToDo
    //
    const participant = await this.userRepository.findOne({ id: userId })
    if (!participant) {
      throw new NotFoundException(`Participant #${userId} not found`)
    }
    this.logger.log(
      `participant = ${participant.firstName} ${participant.lastName}`
    )
    if (meal.participants.length >= meal.maxAmountOfParticipants) {
      throw new BadRequestException(`Max amount of participants reached.`)
    }

    const userParticipates = meal.participants.filter(
      (user) => user.id === participant.id
    )
    if (userParticipates.length === 0) {
      this.logger.log('Currently not participating, so add')
      meal.participants = [...meal.participants, participant]
      await this.mealRepository.save(meal)
      return new ParticipationInfo(true, meal.participants.length)
    } else {
      this.logger.log('Currently participating, so remove')
      const [participant, ...others] = meal.participants
      meal.participants = others
      await this.mealRepository.save(meal)
      return new ParticipationInfo(false, meal.participants.length)
    }
    */
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
    // const cook = await this.userRepository.findOne(userId)
    this.logger.warn('DANGER: comparing COOK to UserID - gaat dit goed?')
    if (meal.cook.id !== userId) {
      throw new BadRequestException(`Not allowed to delete.`)
    }
    await this.mealRepository.delete(mealId)
  }
}
