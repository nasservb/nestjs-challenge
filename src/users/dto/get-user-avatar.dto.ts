import { IsNotEmpty } from 'class-validator';

export class GetUserAvatarDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  avatar: string;
}
