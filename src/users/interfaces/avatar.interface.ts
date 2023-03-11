import { Document } from 'mongoose';

export interface Avatar extends Document {
  readonly user_id: number;
  readonly avatar_url: string;
  readonly avatar_hash: string;
}
