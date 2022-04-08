import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { UserService } from '../persistence/user.service'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { UserEntity } from '@cswp/api-interfaces'
import { ListAllUsersDto } from './user.dto'
import { IUser } from '@cswp/api-interfaces'
import { MessagePattern } from '@nestjs/microservices'
import { AuthApiGuard } from '@cswp/api-interfaces'

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<UserEntity> {
    this.logger.log('getUser - data = ' + JSON.stringify(data))
    return this.userService.findOne(data)
  }

  @Post()
  @ApiOperation({ summary: 'Register as a new user' })
  @ApiBody({ type: CreateUserDto, description: 'The new user' })
  @ApiResponse({ status: 201, description: 'OK.', type: [UserEntity] })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    this.logger.log('create')
    let userEntity = new UserEntity()
    const hashPassword = userEntity.hashPassword
    userEntity = { ...createUserDto, hashPassword }
    return this.userService.create(userEntity)
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Request your personal user profile',
    description:
      'A logged in user (having a valid JWT token) can request its own user information.'
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the user details of the authenticated user',
    type: [UserEntity]
  })
  @ApiResponse({ status: 401, description: 'Forbidden.' })
  @UseGuards(AuthApiGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    this.logger.log(`getUserProfile req.user.userId = ${req.user.userId}`)
    return this.userService.findOne(req.user.userId)
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 201,
    description: 'All records',
    type: [UserEntity]
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized. You need to create a new user first, and login, to get a valid JWT.',
    type: Error
  })
  @UseGuards(AuthApiGuard)
  findAll(@Query() queryParams: ListAllUsersDto): Promise<IUser[]> {
    this.logger.log('findAll')
    // this.logger.log('queryParams: ', queryParams);
    return this.userService.findAll(/* queryParams */)
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single user by id' })
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: UserEntity
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden, no access',
    type: Error
  })
  @UseGuards(AuthApiGuard)
  findOne(@Param('id') id: number): Promise<IUser> {
    this.logger.log('findOne id=' + id)
    return this.userService.findOne({ id })
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a single user',
    description:
      'Edit your user details. You can only edit your personal details. Authentication via login required.'
  })
  @ApiBody({ type: UserEntity, description: 'the new user properties' })
  @ApiResponse({ status: 201, description: 'OK.', type: [UserEntity] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Not allowed to edit' })
  @UseGuards(AuthApiGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ): Promise<IUser> {
    this.logger.log(`update id=${id} user.id=${req.user.userId}`)
    return this.userService.update(id, updateUserDto, req.user.userId)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiBody({ type: 'string', description: 'the id of the user to remove' })
  @ApiResponse({ status: 201, description: 'OK.', type: [UserEntity] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Not allowed to delete' })
  @UseGuards(AuthApiGuard)
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    this.logger.log(`delete user.id=${req.user.userId}`)
    return this.userService.delete(id, req.user)
  }
}
