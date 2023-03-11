import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvatarDocument = HydratedDocument<Avatar>;

@Schema()
export class Avatar {
  @Prop()
  user_id: number;

  @Prop()
  avatar_url: string;

  @Prop()
  avatar_hash: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
