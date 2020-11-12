
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PhotoDocument = Photo & Document;

@Schema()
export class Photo {
  @Prop()
  id: number;

  @Prop()
  filename: string;

  @Prop()
  originalname: string;

  @Prop()
  path: string;

  @Prop({default: Date.now })
  created_at: Date;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);