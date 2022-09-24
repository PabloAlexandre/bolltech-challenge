import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserRequestDTO {
  @IsEmail()
  @ApiProperty({ 
    default: 'sample@gmail.com',
    description: 'User Email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    default: '123456',
    description: 'User Password'
  })
  password: string;

  @IsString()
  @ApiProperty({
    default: 'Sample User',
    description: 'User Name'
  })
  name: string;
}