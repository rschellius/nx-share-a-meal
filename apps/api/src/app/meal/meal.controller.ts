import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { MealService } from './meal.service'
import { CreateMealDto, UpdateMealDto } from './meal.dto'
import { Meal } from './meal.entity'
import { Public } from '../common/decorators/decorators'

@ApiBearerAuth()
@ApiTags('Meal')
@Controller('meal')
export class MealController {
  private readonly logger = new Logger(MealController.name)

  constructor(private readonly mealService: MealService) {}

  @Post()
  @ApiOperation({ summary: 'Register meal' })
  @ApiBody({ type: Meal, description: 'The new meal' })
  @ApiResponse({ status: 201, description: 'OK.', type: [Meal] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createMealDto: CreateMealDto,
    @Req() req
  ): Promise<Meal> {
    this.logger.log('create ' + createMealDto.name)
    this.logger.log('create ' + JSON.stringify(req.user))
    return this.mealService.create({ ...createMealDto, cook: req.user.userid })
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all meals' })
  @ApiResponse({
    status: 201,
    description: 'All records',
    type: [Meal]
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Error })
  findAll(/* @Query() queryParams?: QueryMealsDto */): Promise<Meal[]> {
    this.logger.log('findAll')
    // this.logger.log('queryParams: ', queryParams);
    return this.mealService.findAll(/* queryParams */)
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single meal by id' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Meal
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, no access',
    type: Error
  })
  findOne(@Param('id') id: number): Promise<Meal> {
    this.logger.log('findOne id=' + id)
    return this.mealService.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a single meal' })
  @ApiBody({ type: Meal, description: 'the new meal properties' })
  @ApiResponse({ status: 201, description: 'OK.', type: [Meal] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: number,
    @Body() updateMealDto: UpdateMealDto,
    @Req() req
  ): Promise<Meal> {
    this.logger.log('update id=' + id)
    return this.mealService.update(id, updateMealDto, req.user.userId)
  }

  @Get(':id/participate')
  @ApiOperation({
    summary: 'Participate in a meal.',
    description:
      'Register or unregister as participant in a meal. Requires a valid JWT.'
  })
  @ApiResponse({ status: 201, description: 'OK.', type: [Meal] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async participate(@Param('id') id: number, @Req() req): Promise<Meal> {
    this.logger.log(
      'participate meal id=' + id + ' participant=' + req.user.userid
    )
    await this.mealService.participate(id, req.user.userid)
    return
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete meal' })
  @ApiBody({ type: 'string', description: 'the id of the meal to remove' })
  @ApiResponse({ status: 201, description: 'OK.', type: [Meal] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id') id: number, @Req() req): Promise<void> {
    this.logger.log(`remove mealId=${id} userId=${req.user.userid}`)
    return this.mealService.remove(id, req.user.userid)
  }
}
