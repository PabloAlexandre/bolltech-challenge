import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';
import { CreateUserRequestDTO } from './dtos/CreateUserRequest';
import { LoginRequestDTO } from './dtos/LoginRequest';
import { LoginResponseDTO } from './dtos/LoginResponse';
import { UsersServices } from './users.service';

@Controller('')
@ApiTags('Users')
export class UsersController {

  constructor(
    protected readonly usersServices: UsersServices
  ){}

  @Post('/login')
  @ApiOperation({ summary: 'Login Operation' })
  @ApiResponse({ status: 200, description: "Payload with user credentials"})
  @ApiResponse({ status: 404, description: "User not found"})
  GetUsers(@Body() userLoginCredentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.usersServices.login(userLoginCredentials);
  }

  @Post('/users')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: "Payload with user credentials"})
  @ApiResponse({ status: 400, description: "Validation Error"})
  createUser(@Body() user: CreateUserRequestDTO): Promise<LoginResponseDTO> {
    return this.usersServices.createUser(user);
  }
}
