import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VCardDocument = VCard & Document;

@Schema()
export class VCard {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  nickname: string;

  @Prop()
  company: string;

  @Prop()
  jobTitle: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  websiteURL: string;

  @Prop()
  workURL: string;

  @Prop()
  homePageURL: string;

  @Prop()
  address: string;

  @Prop()
  landmark: string;

  @Prop()
  imageUrl: string; // To store the image URL
}

export const VCardSchema = SchemaFactory.createForClass(VCard);
