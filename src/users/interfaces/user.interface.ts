import { Document } from 'mongoose';
import { Avatar } from './avatar.interface';

export interface User extends Document {
  readonly id: number;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly avatars: Avatar[];
}
