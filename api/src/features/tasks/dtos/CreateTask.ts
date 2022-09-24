import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTaskDTO {
  @ApiProperty()
  @IsString()
  description: string;
}