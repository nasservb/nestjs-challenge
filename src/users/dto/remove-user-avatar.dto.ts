import { IsNotEmpty } from 'class-validator';

export class RemoveUserAvatarDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  avatar: string;
}
