import { Controller, Get, Post, Body, Inject, Param, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiKeyAuthGuard } from '../auth/guard/api-key-auth.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';


@ApiTags('users')
@Controller({
  version: '1',
  path: 'users'
})
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'The found record' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | undefined> {
    let user = await this.userService.findOne(id);
    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The found records', type: [User] })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    if(!(await this.authService.userExists(createUserDto.id))) {
      throw new NotFoundException(
        `User with id ${createUserDto.id} does not exist.`
      );
    }

    if(!(await this.authService.userEmailExists(createUserDto.email))) {
      throw new NotFoundException(
        `User with email ${createUserDto.email} does not exist.`
      );
    }
    
    let user = await this.userService.create(createUserDto);
    return user;
  }
}
