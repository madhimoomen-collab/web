import { ApiProperty } from '@nestjs/swagger';

export class HelloDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Hello World!' })
  message: string;
}