
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant {
  @Prop()
  scientific_name: string;

  @Prop()
  common_name: string;

  @Prop()
  nickname: string;

  @Prop()
  aquired_at: string;

  @Prop([String])
  source: string[];

  @Prop({default: Date.now })
  acquired_at: Date;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);