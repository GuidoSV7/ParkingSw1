import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class NotificationDto {
  @ApiProperty({
    type: String,
    description: 'Client device token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    type: String,
    description: 'Notification Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Notification Body',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Notification Icon / Logo',
  })
  @IsString()
  @IsOptional()
  icon?: string;
}

export class MultipleDeviceNotificationDto {
  @ApiProperty({
    type: [String],
    description: 'Clients device tokens',
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  tokens: string[];

  @ApiProperty({
    type: String,
    description: 'Notification Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Notification Body',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Notification Icon / Logo',
  })
  @IsString()
  @IsOptional()
  icon?: string;
}

export class TopicNotificationDto {
  @ApiProperty({
    type: String,
    description: 'Subscription topic to send to',
  })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({
    type: String,
    description: 'Notification Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Notification Body',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Notification Icon / Logo',
  })
  @IsString()
  @IsOptional()
  icon?: string;
}